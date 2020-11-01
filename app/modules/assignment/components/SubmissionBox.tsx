import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import createAssignmentSubmission from "app/modules/assignment/mutations/createAssignmentSubmission"
import { dynamic, useMutation } from "blitz"
import "filepond/dist/filepond.min.css"
import { ActionButtons, Box, Dialog } from "bumbag"
import React, { useState } from "react"
import { useCurrentProfile } from "app/hooks/useCurrentProfile"
const FilePond = dynamic(import("react-filepond").then((mod) => mod.FilePond))

export enum SubmissionBoxType {
  SUCCESS = "success",
  WARNING = "warning",
}

type SubmissionBoxProps = {
  assignmentId: number
  type: SubmissionBoxType
}

const SubmissionBox = ({ assignmentId, type }: SubmissionBoxProps) => {
  const currentClassroom = useCurrentClassroom()
  const [files, setFiles] = useState<any>([])
  const [createAssignmentSubmissionMutation] = useMutation(createAssignmentSubmission, {
    onSuccess: () => setIsAssignmentSubmitted(true),
  })
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = React.useState(false)
  const studentProfile = useCurrentProfile()

  return (
    <>
      {/* Allow students to upload and view their assignment submissions */}
      <Dialog
        marginY="minor-10"
        title={
          type === SubmissionBoxType.SUCCESS || isAssignmentSubmitted
            ? "Assignment Uploaded!"
            : "Upload Assignment"
        }
        type={type === SubmissionBoxType.SUCCESS || isAssignmentSubmitted ? "success" : "warning"}
        standalone
      >
        <Dialog.Content>
          <Dialog.Icon />
          <Box>
            <Dialog.Header>
              <Dialog.Title>
                {type === SubmissionBoxType.SUCCESS || isAssignmentSubmitted
                  ? "Assignment Uploaded!"
                  : "Upload Assignment"}
              </Dialog.Title>
            </Dialog.Header>
            {type === SubmissionBoxType.SUCCESS || isAssignmentSubmitted
              ? "Thank you for submitting your assignment. Your teacher will now review and grade your work."
              : "Your assignment is still due. Use the form below to upload your assignment."}
            {/* Hide upload form if assignment is submitted. */}
            {type === SubmissionBoxType.WARNING && !isAssignmentSubmitted && (
              <FilePond
                // @ts-ignore
                files={files}
                // @ts-ignore
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={`/api/upload/assignments/${currentClassroom?.id}/${assignmentId}`}
                name="files"
                onprocessfile={(_error, file) => {
                  // When the file is upload to the cloud we want to
                  // create a record that references it
                  console.log(file)
                  // })
                  if (studentProfile) {
                    createAssignmentSubmissionMutation({
                      data: {
                        assignment: { connect: { id: assignmentId } },
                        name: file.filename,
                        size: file.fileSize,
                        path: `assignments/${currentClassroom?.id}/${assignmentId}/${file.filename}`,
                        student: { connect: { id: studentProfile.id } },
                      },
                    })
                  }
                  console.log("Uploaded", file)
                }}
                onprocessfiles={() => console.log("done")}
                labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            )}
          </Box>
        </Dialog.Content>
        {(type === SubmissionBoxType.SUCCESS || isAssignmentSubmitted) && (
          <Dialog.Footer display="flex" justifyContent="center">
            <ActionButtons
              cancelText="Withdraw Submission"
              submitText="View Submission"
              cancelProps={{ palette: "danger" }}
              onClickSubmit={() => console.log("submitted")}
              onClickCancel={() => {
                setIsAssignmentSubmitted(false)
              }}
            />
          </Dialog.Footer>
        )}
      </Dialog>
    </>
  )
}

export default SubmissionBox
