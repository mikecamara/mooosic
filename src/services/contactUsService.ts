import axios from 'axios';

export const submitContactForm = async (formValues: any) => {
  const apiUrl =
    'https://xir9ziyto0.execute-api.ap-southeast-2.amazonaws.com/contactUsStage-58978dd/contact-us';
  return await axios.post(apiUrl, formValues);
};
