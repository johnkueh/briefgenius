const Upload = () => (
  <div>
    <button
      onClick={() => {
        cloudinary.openUploadWidget(widgetOptions, (err, info) => {
          if (!err) if (info.event === 'success') handleSuccess(info);
        });
      }}
    >
      Upload
    </button>
  </div>
);

const handleSuccess = ({ info: { public_id } }) => {
  console.log('handleSuccess', public_id);
};

const widgetOptions = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  sources: ['local', 'url', 'camera', 'image_search', 'facebook', 'dropbox', 'instagram'],
  showAdvancedOptions: false,
  cropping: true,
  multiple: false,
  defaultSource: 'local',
  styles: {
    palette: {
      window: '#FFFFFF',
      windowBorder: '#95A5A6',
      tabIcon: '#007BFF',
      menuIcons: '#5A616A',
      textDark: '#2C3E50',
      textLight: '#FFFFFF',
      link: '#007BFF',
      action: '#E67E22',
      inactiveTabIcon: '#BDC3C7',
      error: '#E74C3C',
      inProgress: '#007BFF',
      complete: '#2ECC71',
      sourceBg: '#ECF0F1'
    },
    fonts: {
      default: null,
      'system-ui, sans-serif': {
        url: null,
        active: true
      }
    }
  }
};

export default Upload;
