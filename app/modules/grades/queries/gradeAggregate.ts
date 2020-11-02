import db from "db"

const avgFunc = async (classroomId: number) => {
  let grades: number[] = []

  // select student ids for this classroom
  const studentIdsRes = await db.classroom.findMany({
    where: { id: classroomId },
    select: { StudentProfileOnClassroom: { select: { studentProfileId: true } } },
  })

  // build student ids array
  const studentIds = studentIdsRes[0]?.StudentProfileOnClassroom.map(
    (studentId) => studentId.studentProfileId
  )

  // asynchronously calculate the percentage for each student
  // we divide total grade the student received by the attainable marks
  // so we divide one large number by another large number to get the students overall average
  // we now add that average value to the grades array
  if (studentIds.length > 0) {
    await Promise.all(
      studentIds.map(async (studentId) => {
        const res = await db.grade.aggregate({
          sum: { amountReceived: true, total: true },

          where: {
            GradeOnStudentProfile: { some: { classroomId: 1, studentId: { equals: studentId } } },
          },
        })

        // we dont want to receive NaN as the result since 0 / 0 is NaN
        if (res.sum.amountReceived > 0 && res.sum.total > 0) {
          grades.push(res.sum.amountReceived / res.sum.total)
        }
      })
    )
  }

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

  console.log("Grades", grades)
  const results = {
    avg: average(grades),
    med: median(grades),
    max: grades.length > 0 ? Math.max(...grades) : 0,
  }
  return results
}
