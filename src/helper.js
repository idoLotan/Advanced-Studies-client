export const getCourses = async (getCourses, setCourses) => {
  const courses = await getCourses();
  setCourses(courses);
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("personObject"));
  return user;
};

// export const renderDynamicInputs = (
//   dynamicInputs,
//   removeDynamicInput,
//   AddQuestions,
//   setQestionId,
//   courseName,
//   inputRefs,
//   setFormValues,
//   formValues
// ) => {
//   return dynamicInputs.map((input, index) => {
//     const name = `input-${index}`;

//     if (input.type === "question") {
//       return (
//         <div className="add-content-unit left" key={index}>
//           <i
//             className="fas fa-times"
//             onClick={() => removeDynamicInput(index)}
//           />
//           <AddQuestions
//             setQestionId={setQestionId}
//             currentCourseName={courseName}
//             // placeholder={`Course Content ${
//             //   dynamicInputs.length + 1
//             // } question`}
//             // onSave={(question) =>
//             //   setFormValues({
//             //     ...formValues,
//             //     [name]: question,
//             //   })
//             // }
//           />
//         </div>
//       );
//     }

//     return (
//       <div className="add-content-unit left" key={index}>
//         <i className="fas fa-times" onClick={() => removeDynamicInput(index)} />
//         <div>
//           <input
//             className={
//               input.type === "text"
//                 ? "custom-content-input-text"
//                 : "custom-content-input "
//             }
//             type={input.type}
//             placeholder={input.placeholder}
//             ref={(el) => (inputRefs.current[index] = el)}
//             name={name}
//             onChange={(e) =>
//               setFormValues({
//                 ...formValues,
//                 [name]:
//                   input.type === "file" ? e.target.files[0] : e.target.value,
//               })
//             }
//           />
//         </div>
//       </div>
//     );
//   });
// };

// export const addFieldsList = (fieldsList, handleFieldName) => {
//   return (
//     fieldsList && (
//       <select onChange={handleFieldName}>
//         {fieldsList?.map((item) => (
//           <option value={item} key={item}>
//             {item}
//           </option>
//         ))}
//       </select>
//     )
//   );
// };

// export const addDynamicInput = (type, dynamicInputs, setDynamicInputs) => {
//   setDynamicInputs([
//     ...dynamicInputs,
//     {
//       type: type,
//       placeholder: `Course Content ${dynamicInputs.length + 1} paragraph`,
//     },
//   ]);
// };

// export const removeDynamicInput = (
//   index,
//   setDynamicInputs,
//   dynamicInputs,
//   inputRefs
// ) => {
//   inputRefs.current = inputRefs.current.filter((_, i) => i !== index); // Remove input ref
//   setDynamicInputs(
//     dynamicInputs.filter((_, i) => {
//       console.log(i, index);
//       return i !== index;
//     })
//   );
// };
