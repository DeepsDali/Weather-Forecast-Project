export const docEventListener = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    const defaultPostcode = "N2 9NX";
    const submitEvent = new Event("submit");
    form.querySelector("[name='postcode']").value = defaultPostcode;
    form.dispatchEvent(submitEvent);
  });
};
