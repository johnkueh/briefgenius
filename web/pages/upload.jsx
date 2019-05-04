import { useUpload } from '../lib/use-upload';

const Upload = () => {
  const onSuccess = data => {
    console.log('onSuccess', data);
  };

  const { openWidget } = useUpload(onSuccess);

  return (
    <div>
      <button onClick={openWidget}>Upload</button>
    </div>
  );
};

// const handleSuccess = ({ info: { public_id } }) => {
//   console.log('handleSuccess', public_id);
// };

export default Upload;
