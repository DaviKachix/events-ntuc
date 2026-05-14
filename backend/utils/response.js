exports.success = (res, data, message = "OK") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

exports.created = (res, data, message = "Created") => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

exports.fail = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};