function formatValidationErrors(errors) {
  const newErrors = {}

  Object.keys(errors).forEach((property) => {
    newErrors[property] = errors[property].map(errorList => errorList.message)
  })

  return newErrors
}
export default formatValidationErrors
