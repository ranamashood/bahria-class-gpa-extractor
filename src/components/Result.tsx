import { useEffect, useState } from "react";
import { CourseInterface } from "../models";

interface Props {
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}

const getGPA = (grade: string): number => {
  switch (grade) {
    case "A":
      return 4;
    case "A-":
      return 3.67;
    case "B+":
      return 3.33;
    case "B":
      return 3;
    case "B-":
      return 2.67;
    case "C+":
      return 2.33;
    case "C":
      return 2;
    case "C-":
      return 1.67;
    case "D+":
      return 1.33;
    case "D":
      return 1;
  }

  return 0;
};

const extractData = (
  regexp: RegExp,
  input: { result: string },
): string | null => {
  const searchRegexp = new RegExp(">" + regexp.source);
  const index = input.result.search(searchRegexp);
  input.result = input.result.substring(index + 1);

  return input.result.match(regexp)?.[0] ?? null;
};

const extractField = (
  keyRegExp: RegExp,
  valueRegExp: RegExp,
  input: { result: string },
) => {
  extractData(keyRegExp, input);
  return extractData(valueRegExp, input);
};

const Result = ({ result, setResult }: Props) => {
  const [course, setCourse] = useState<CourseInterface>({
    title: "",
    creditHours: 0,
    students: [],
  });

  useEffect(() => {
    let updatedResult = { result };

    const enrollment = extractData(/[0-3]{2}-[0-9]{6}-[0-9]{3}/, updatedResult);
    const name = extractData(/[A-Z ]+/, updatedResult);
    const gpa = extractData(/[A-F][+-]?/, updatedResult);

    if (enrollment && name && gpa) {
      const newStudent = {
        enrollment: enrollment,
        name: name,
        gpa: getGPA(gpa),
      };

      setCourse((prevCourse) => ({
        ...prevCourse,
        students: [...prevCourse.students, newStudent],
      }));

      setResult(updatedResult.result);
    }
  }, [result]);

  useEffect(() => {
    let updatedResult = { result };

    const title = extractField(/Course Title/, /[A-Z a-z]+/, updatedResult);
    const creditHours = extractField(/Credit Hours/, /[0-3]/, updatedResult);

    if (title && creditHours) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        title: title,
        creditHours: parseInt(creditHours),
      }));
    }
  }, []);

  return (
    <div>
      <div>{course.title}</div>
      <div>{course.creditHours}</div>
      <hr />
      {course.students.map((student, index) => (
        <div key={index}>
          <div>{student.enrollment}</div>
          <div>{student.name}</div>
          <div>{student.gpa}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Result;
