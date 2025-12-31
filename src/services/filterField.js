const USER_FIELDS = ["username", "email", "phone", "avatarURL"];
const PROFILE_FIELDS = [
  "code",
  "grade",
  "school",
  "gender",
  "dob",
  "address",
  "fatherName",
  "fatherPhone",
  "motherName",
  "motherPhone",
  "referrer",
  "active",
];
const pickFields = (source, fields) =>
  fields.reduce((acc, key) => {
    if (source[key] !== undefined && source[key] !== "") {
      acc[key] = source[key];
    }
    return acc;
  }, {});

export { pickFields , USER_FIELDS, PROFILE_FIELDS };
