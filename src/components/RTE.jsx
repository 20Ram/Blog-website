// import React from 'react'
// import { Editor } from '@tinymce/tinymce-react'
// import { Controller } from 'react-hook-form'


// function RTE({name, control, label, defaultValue =''}) {
//   return (
//     <div className='w-full'>
//       {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//       <Controller
//       name={name || "content"}
//        control={control}
//        render={({field : {onChange }}) => (
//         <Editor 
//         apiKey="60ot0vdtq6xf5vqe6a86dbia1drp44bckyrjyenygk7d6xsg"
//         initialValue={defaultValue}
//         init={{
//           initialValue: defaultValue,
//           height: 500,
//           menubar: true,
//           plugins: [
//             'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
//             'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
//             'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
//         ],
//           toolbar:
//             `undo redo | blocks fontselect fontsizeselect |
//              bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | link image media codesample | insertdatetime table emoticons | code preview     fullscreen | removeformat | help`,
//            content_style:"body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; } "
//         }}
//         onEditorChange={onChange}
//         />
//        )} 
//       />
//     </div>
//   )
// }
// export default RTE


import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name = "content", control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-700">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="60ot0vdtq6xf5vqe6a86dbia1drp44bckyrjyenygk7d6xsg"
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar:
                `undo redo | blocks fontselect fontsizeselect |
                 bold italic underline strikethrough | forecolor backcolor |
                 alignleft aligncenter alignright alignjustify |
                 bullist numlist outdent indent |
                 link image media codesample | insertdatetime table emoticons |
                 code preview fullscreen | removeformat | help`,
              content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
            }}
          />
        )}
      />
    </div>
  )
}

export default RTE
