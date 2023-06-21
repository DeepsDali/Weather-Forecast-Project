export const docEventListener = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    const defaultPostcode = "SW1A 2AA";
    const submitEvent = new Event("submit");
    form.querySelector("[name='postcode']").value = defaultPostcode;
    form.dispatchEvent(submitEvent);
  });
};
