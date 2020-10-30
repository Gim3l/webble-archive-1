import StatCard from "app/modules/classroom/components/StatCard"
import DashboardLayout from "app/layouts/DashboardLayout"
import { Box, Button, Card, Divider, Flex, Heading, InputField, Modal } from "bumbag"
import React, { Suspense, useState } from "react"
import { dynamic, getQueryKey, invalidateQuery, useMutation, useQuery } from "blitz"
import createResourceFolder from "app/modules/resource/mutations/createResourceFolder"
import useCurrentClassroom from "app/modules/classroom/hooks/useCurrentClassroom"
import useClassroomFolders from "app/modules/classroom/hooks/useClassroomFolders"
import FolderForm from "app/modules/classroom/components/FolderForm"
import { useStore } from "utils/store"
import { FilePond } from "react-filepond"
import "filepond/dist/filepond.min.css"
import createResourceFile from "app/modules/resource/mutations/createResourceFile"
import getClassroomFolders from "app/modules/resource/queries/getClassroomFolders"
import { queryCache } from "react-query"

const FileBrowserBox = dynamic(import("app/modules/classroom/components/FileBrowserBox"), {
  ssr: false,
})

const AddFolderForm = () => {
  const currentClassroom = useCurrentClassroom()
  const [createResourceFolderMutation] = useMutation(createResourceFolder)
  const [colour, setColour] = useState<any>()

  const [_, { refetch }] = useClassroomFolders({
    where: { classroomId: currentClassroom?.id },
    include: { files: true },
  })
  const onAddFolder = async (values) => {
    await createResourceFolderMutation({
      data: {
        name: values.folderName,
        colour: colour?.hex,
        classroom: { connect: { id: currentClassroom?.id } },
      },
    })
    await refetch()
  }

  return (
    <FolderForm
      initialData={{}}
      submitText="Create Folder"
      onSubmit={onAddFolder}
      colour={colour}
      setColour={setColour}
    ></FolderForm>
  )
}

const UploadFileModal = () => {
  const currentFolder: any = useStore((state) => state.currentFolder)
  const setCurrentFolder: any = useStore((state) => state.setCurrentFolder)
  const [files, setFiles] = useState([])
  const currentClassroom = useCurrentClassroom()
  const [mutate] = useMutation(createResourceFile)
  const key = getQueryKey(getClassroomFolders)

  return (
    <Modal.State animated>
      <Modal.Disclosure use={Button}>New File</Modal.Disclosure>
      <Modal fade expand>
        <Modal.Disclosure
          // @ts-ignore
          use={(props) => (
            <Button
              {...props}
              margin="10px"
              color="#fff"
              palette="danger"
              size="small"
              float="right"
              marginLeft="0 auto"
            />
          )}
        >
          Close
        </Modal.Disclosure>
        <Card>
          <FilePond
            files={files}
            //@ts-ignore
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={3}
            server={`/api/upload/${2}`}
            name="files"
            onprocessfile={(error, file) => {
              mutate({
                data: {
                  path: `resources/${currentClassroom?.id}/${file.filename}`,
                  size: file.fileSize,
                  name: file.filename,
                  resourceFolder: { connect: { id: currentFolder.id } },
                },
              })
              console.log("Uploaded", file)
            }}
            onprocessfiles={() => invalidateQuery(getClassroomFolders)}
            labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <Divider></Divider>
        </Card>
      </Modal>
    </Modal.State>
  )
}

function ClassroomResourcesPage() {
  const currentFolder: any = useStore((state) => state.currentFolder)

  return (
    <div>
      <Heading use="h4" marginBottom="minor-6">
        Summary
      </Heading>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridColumnGap="24px">
        <StatCard title="Resources" value="22"></StatCard>
        <StatCard title="New resources this month" value="12"></StatCard>
        <StatCard title="Views this month" value="102"></StatCard>
      </Box>

      <Divider marginY="minor-10" backgroundColor="#D2D2D2" />

      <Flex justifyContent="space-between" alignItems="center" marginBottom="minor-6">
        <Heading use="h4">Browse</Heading>
        {!currentFolder ? (
          <Modal.State animated>
            <Modal.Disclosure use={Button}>New</Modal.Disclosure>
            <Modal fade expand>
              <Modal.Disclosure
                // @ts-ignore
                use={(props) => (
                  <Button
                    {...props}
                    margin="10px"
                    color="#fff"
                    palette="danger"
                    size="small"
                    float="right"
                    marginLeft="0 auto"
                  />
                )}
              >
                Close
              </Modal.Disclosure>
              <Card>
                <Suspense fallback="Loading...">
                  <AddFolderForm></AddFolderForm>
                </Suspense>
                <Divider></Divider>
              </Card>
            </Modal>
          </Modal.State>
        ) : (
          <Suspense fallback="Loading...">
            <UploadFileModal></UploadFileModal>
          </Suspense>
        )}
      </Flex>
      <Suspense fallback="Loading...">
        <FileBrowserBox></FileBrowserBox>
      </Suspense>
    </div>
  )
}

ClassroomResourcesPage.getLayout = (page) => (
  <DashboardLayout heading="Resources" title="Resources">
    {page}
  </DashboardLayout>
)

export default ClassroomResourcesPage
