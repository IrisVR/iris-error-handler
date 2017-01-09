/**
 * Ensure the uploaded pano contains required fields
 */
function isMissingProperty(pano) {
  return (
    !{}.hasOwnProperty.call(pano, 'owner') ||
    !{}.hasOwnProperty.call(pano.owner, 'username') ||
    !{}.hasOwnProperty.call(pano.owner, '_id') ||
    !{}.hasOwnProperty.call(pano, 'format') ||
    !{}.hasOwnProperty.call(pano, 'stereoscopic') ||
    !{}.hasOwnProperty.call(pano, 'raw') ||
    !{}.hasOwnProperty.call(pano.raw, 'aws_bucket') ||
    !{}.hasOwnProperty.call(pano.raw, 'aws_key') ||
    !{}.hasOwnProperty.call(pano.raw, 'aws_name') ||
    !{}.hasOwnProperty.call(pano.raw, 'content_type') ||
    !{}.hasOwnProperty.call(pano.raw, 'size') ||
    !{}.hasOwnProperty.call(pano.raw, 'width') ||
    !{}.hasOwnProperty.call(pano.raw, 'height') ||
    !{}.hasOwnProperty.call(pano.raw, 'ext') ||
    !{}.hasOwnProperty.call(pano.raw, 'url')
  );
}

exports.handleMissingPanoField = pano =>
  new Promise((resolve, reject) => {
    const panoCopy = pano.toObject();
    return isMissingProperty(panoCopy)
      ? reject(Error(370))
      : resolve(pano);
  });
