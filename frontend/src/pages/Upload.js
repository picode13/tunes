import React, { useState } from 'react';
import { Upload, Icon, message,Typography } from 'antd';


const UploadLibrary=(props)=>{
  const[fileList,setFileList]=useState([]);
    const propsValue = {
        name: 'file',
        multiple: true,
        action: `${process.env.REACT_APP_API_URL}/music/upload`,
        withCredentials:true,
        headers:{"CSRF-Token":
        document.cookie.split("=")[0]==="XSRF-TOKEN"?
        document.cookie.split("=")[1]:
        document.cookie.split("=")[2]},
        onChange(info) {
          
          const fileList = [...info.fileList];
          const { status } = info.file;
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            setFileList(fileList.filter(check=>check.name !== info.file.name))
          } else if (status === 'error') {
            message.error(`${info.file.name} ${info.file.response?info.file.response.message:"Upload Errpr"} `);
            setFileList(fileList.filter(check=>check.type.indexOf("audio")>=0 ||check.type==="application/octet-stream"))
          }else{
        
          setFileList(fileList.filter(check=>check.type.indexOf("audio")>=0 ||check.type==="application/octet-stream"))
          }
        },
        beforeUpload(file,fileList) {
          
          const isMp3 = file.type.indexOf("audio")>=0 ||file.type==="application/octet-stream"
          if (!isMp3) {
            
           
            message.error(`You can only upload Mp3 file!.File type ${file.type}`);
            // setFileList(fileList.filter(check =>check.uid !== file.uid))
          }
          return isMp3 
         
        }
      };
    return(
        <div>
        <Typography.Title level={3}>Add to your library</Typography.Title>
<Upload.Dragger {...propsValue} accept="audio/mp3" showUploadList={{showPreviewIcon:true,showRemoveIcon:true}}
fileList={fileList}>
<p className="ant-upload-drag-icon">
  <Icon type="inbox" />
</p>
<p className="ant-upload-text">Click or drag file to this area to upload</p>
<p className="ant-upload-hint">
  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
  band files
</p>
</Upload.Dragger>
</div>
    )
}

export default UploadLibrary;
