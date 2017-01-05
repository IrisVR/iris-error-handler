exports.handleMissingPanoField = (pano) => {
  const panoCopy = pano.toObject();

  if (
    !{}.hasOwnProperty.call(panoCopy, 'owner') ||
    !{}.hasOwnProperty.call(panoCopy.owner, 'username') ||
    !{}.hasOwnProperty.call(panoCopy.owner, '_id') ||
    !{}.hasOwnProperty.call(panoCopy, 'format') ||
    !{}.hasOwnProperty.call(panoCopy, 'stereoscopic') ||
    !{}.hasOwnProperty.call(panoCopy, 'raw') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'aws_bucket') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'aws_key') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'aws_name') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'content_type') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'size') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'width') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'height') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'ext') ||
    !{}.hasOwnProperty.call(panoCopy.raw, 'url')
  ) {
    return Promise.reject(Error(370));
  }
  return Promise.resolve(pano);
};
