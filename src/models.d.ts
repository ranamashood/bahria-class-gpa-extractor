interface StudentInterface {
  enrollment: string;
  name: string;
  gpa: number;
}

interface CourseInterface {
  title: string;
  creditHours: number;
  students: StudentInterface[];
}

export { CourseInterface };
