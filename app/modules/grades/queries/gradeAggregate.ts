import db from "db"

const avgFunc = async (classroomId: number) => {
  let grades: number[] = []
  const studentIdsRes = await db.classroom.findMany({
    where: { id: classroomId },
    select: { StudentProfileOnClassroom: { select: { studentProfileId: true } } },
  })

  const studentIds = studentIdsRes[0]?.StudentProfileOnClassroom.map(
    (studentId) => studentId.studentProfileId
  )

  console.log(studentIds, "Student IDs")

  await Promise.all(
    studentIds.map(async (studentId) => {
      const res = await db.grade.aggregate({
        sum: { amountReceived: true, total: true },

        where: {
          GradeOnStudentProfile: { some: { classroomId: 1, studentId: { equals: studentId } } },
        },
      })

      grades.push(res.sum.amountReceived / res.sum.total)
    })
  )
  return grades
}

function median(values) {
  if (values.length === 0) return 0

  values.sort(function (a, b) {
    return a - b
  })

  var half = Math.floor(values.length / 2)

  if (values.length % 2) return values[half]

  return (values[half - 1] + values[half]) / 2.0
}
// returns the total grade for a particular user
export default async function gradeAggregate({ classroomId }: { classroomId: number }) {
  let average = (array) => (array.length > 0 ? array.reduce((a, b) => a + b) / array.length : 0)
  let grades = await avgFunc(classroomId)

  console.log(grades)

  return {
    avg: average(grades),
    med: median(grades),
    max: grades.length > 0 ? Math.max(...grades) : 0,
  }
}
