// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.deleteFile(post.featuredimage);
//             }

//             const dbPost = await appwriteService.upDatePost(post.$id, {
//                 ...data,
//                 featuredimage: file ? file.$id : undefined
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
            
//             if (!userData) {
//                 console.error("User not logged in");
//                 return;
//             }

//             const file = await appwriteService.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredimage = fileId;
//                 const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);
// //  console.log(post);
// //  console.log("post.featuredimage",post.featuredimage);
 
//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post?.featuredimage && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredimage)}
//                             alt={post.title}
//                             className="rounded-lg"
                            
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }



import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".."; // Custom components
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const { success, error: showError } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (post) {
                // Update existing post
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredimage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage,
                });

                if (dbPost) {
                    success("Post updated successfully!");
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    showError("Failed to update post. Please try again.");
                }
            } else {
                // Create new post
                if (!userData) {
                    showError("You must be logged in to create a post.");
                    return;
                }

                if (!data.image || !data.image[0]) {
                    showError("Please select a featured image for your post.");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file) {
                    showError("Failed to upload image. Please try again.");
                    return;
                }

                const newPost = await appwriteService.createPost({
                    ...data,
                    featuredimage: file.$id,
                    userId: userData.$id,
                });

                if (newPost) {
                    success("Post created successfully!");
                    navigate(`/post/${newPost.$id}`);
                } else {
                    showError("Failed to create post. Please try again.");
                }
            }
        } catch (err) {
            console.error("Post submission error:", err);
            showError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        return value
            ? value
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z\d\s]+/g, "-")
                  .replace(/\s+/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Column */}
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="auto-generated slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    {...register("image", { required: !post })}
                />

                {post?.featuredimage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage).href}
                            alt={post.title}
                            className="rounded-lg w-full object-cover shadow-md border border-gray-200"
                        />

                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button 
                    type="submit" 
                    bgColor={post ? "green" : "blue"} 
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Processing..." : (post ? "Update Post" : "Create Post")}
                </Button>
            </div>
        </form>
    );
}
