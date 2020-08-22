
let input = {
"%%%_contactTitle_1598053787047": "Github",
"%%%_contactValue_1598053787047": "https://github.com/nurlykhan06",

"%%%_contactTitle_1598053787613": "Website",
"%%%_contactValue_1598053787613": "https://nurlykhan06.github.io/",

"%%%_educationPlace_1598041556803": "Harvard",
"%%%_educationProfession_1598041556803": "Scientist",
"%%%_educationStartDate_1598041556803": "01.09.2012",
"%%%_educationEndDate_1598041556803": "01.09.2015",

"%%%_educationPlace_1598041556456": "Stenford",
"%%%_educationProfession_1598041556456": "Developer",
"%%%_educationStartDate_1598041556456": "01.09.2015",
"%%%_educationEndDate_1598041556456": "01.09.2019",


"%%%_workPlace_1598041546139": "Google",
"%%%_workPosition_1598041546139": "Director",
"%%%_workStartDate_1598041546139": "12.3.1231",
"%%%_workEndDate_1598041546139": "12.3.3123",


"%%%_workPlace_1598041546151": "Amazon",
"%%%_workPosition_1598041546151": "Director",
"%%%_workStartDate_1598041546151": "12.3.1231",
"%%%_workEndDate_1598041546151": "12.3.3123",

about: "Something",
birthday: "22.08.2020",
email: "n.salamatoff@gmail.com",
lastname: "Ibn Salamat",
name: "Nurlykhan",
skills: "Javascript, Node.js",
}

 function transformData(input) {
  let filter = (objects, h = {}) =>
    objects.filter((object) => !h[object.id] && (h[object.id] = true));

  let keys = Object.keys(input),
    _workList = [],
    _educationList = [],
    _contactsList = [];

  keys.map((key) => {
    if (key.includes("%%%_")) {
      if (key.includes("work")) {
        _workList.push(key);
      } else if (key.includes("education")) {
        _educationList.push(key);
      } else if (key.includes("contact")) {
        _contactsList.push(key);
      }
    }
  });

  function transformField(inputArr, ...fields) {
    const outputArray = [];
    inputArr.map((item) => {
      const id = item.split("_")[2];
      let obj = { id };

      keys.map((key) => {
        if (key.includes(id)) {
          fields.map((field) => {
            if (key.includes(field)) {
              obj[field] = input[key];
              delete input[key];
            }
          });
        }
      });

      outputArray.push(obj);
    });

    return filter(outputArray);
  }

  const work = transformField(_workList, "Position", "Place", "StartDate", "EndDate");
  const education = transformField(
    _educationList,
    "Profession",
    "Place",
    "StartDate",
    "EndDate"
  );
  const contacts = transformField(_contactsList, "Title", "Value");

  input.contacts = contacts;
  input.education = education;
  input.work = work;

  return input;
}


const transformedData = transformData(input)
