const [form, setForm] = useLocalStorage("createJobForm", {
  jobTitle: "",
  companyName: "",
  location: "",
  jobType: "",
  minSalary: "",
  maxSalary: "",
  deadline: "",
  description: "",
});
