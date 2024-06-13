const validation_strings = () => {
    const validation_strings = {
        required_msg: 'This field is required',
        negatives_msg: 'This field can not be negative!',
        numbers_only_msg: 'This field can only contain numbers',
        chars_only_msg: 'This field can only contain characters',
        valid_url_msg: 'The provided url is not valid!',
        phone_no_msg: 'The provided phone number is not valid!',
    
        chars_only_chk: /^[a-zA-Z ]*$/,
        numbers_only_chk: /^[0-9]+$/,
        phone_no_check_1: /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        valid_url_check: /^(\w+:\/\/)?[\w.]+(\.\w+)+(\/\S*)?$/,
        phone_no_check: /^\+\d+(-\d+)*$/,
        
        min_msg: (value) => `This field must contain at least ${value} characters`,
        max_msg: (value) => `This field can not contain more than ${value} characters`,
        exact_msg: (value) => `This field must contain exactly ${value} characters`
    }
  return (
    validation_strings
  )
}

export default validation_strings