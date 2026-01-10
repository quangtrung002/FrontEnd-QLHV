const USER_FIELDS = ["username", "email", "phone", "avatarURL"];
const PROFILE_FIELDS = [
  "code",
  "school",
  "gender",
  "dob",
  "address",
  "fatherName",
  "fatherPhone",
  "motherName",
  "motherPhone",
  "referrer",
];
const ENROLLMEN_FIELDS = ["grade", "assignedTeacherId", "studentStatus"];
const pickFields = (source, fields) =>
  fields.reduce((acc, key) => {
    if (source[key] !== undefined && source[key] !== "") {
      acc[key] = source[key];
    }
    return acc;
  }, {});

export { pickFields, USER_FIELDS, PROFILE_FIELDS, ENROLLMEN_FIELDS };
