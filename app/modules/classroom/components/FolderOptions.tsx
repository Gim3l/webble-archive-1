import updateResourceFolder from "app/modules/resource/mutations/updateResourceFolder"
import { Box, Button, Card, Dialog, DropdownMenu, Icon, Modal } from "bumbag"
import React, { Suspense, useState } from "react"
import useCurrentClassroom from "../hooks/useCurrentClassroom"
import FolderForm from "./FolderForm"

const EditFolderForm = ({ initialData, refetch }) => {
  const currentClassroom = useCurrentClassroom()

  const [colour, setColour] = useState(initialData.colour)

  const onEditFolder = async (values, refetch) => {
    await updateResourceFolder({
      data: {
        name: values.folderName,
        colour: colour.hex,
      },
      where: { id: initialData.id },
    })
    refetch()
  }

  return (
    <>
      <FolderForm
        onSubmit={(values) => onEditFolder(values, refetch)}
        colour={colour}
        setColour={setColour}
        initialData={{ folderName: initialData.folderName }}
        submitText="Save Changes"
      ></FolderForm>
    </>
  )
}

const FolderOptions = ({ folder, refetch, onDelete }) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        <Modal.State animated>
          <Dialog.Modal baseId="23434" title="Edit" fade slide hideBackdrop={false}>
            {(modalProps) => (
              <Modal.Disclosure>
                {(modalDisclosureProps) => (
                  <React.Fragment>
                    <DropdownMenu
                      menu={
                        <>
                          <DropdownMenu.Item
                            {...modalDisclosureProps}
                            iconBefore="solid-file-signature"
                          >
                            Edit
                          </DropdownMenu.Item>
                          {/* <DropdownMenu.Item iconBefore="solid-file-signature">
                            Rename
                          </DropdownMenu.Item> */}
                          <DropdownMenu.Item
                            iconBefore="solid-trash-alt"
                            color="danger"
                            onClick={onDelete}
                          >
                            Delete
                          </DropdownMenu.Item>
                        </>
                      }
                    >
                      <Button size="small">
                        <Icon icon="solid-ellipsis-h"></Icon>
                      </Button>
                    </DropdownMenu>

                    <Box {...modalProps} position="relative">
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
                          <EditFolderForm
                            refetch={refetch}
                            initialData={{
                              folderName: folder.name,
                              colour: folder.colour,
                              id: folder.id,
                            }}
                          ></EditFolderForm>
                        </Suspense>
                      </Card>
                    </Box>
                  </React.Fragment>
                )}
              </Modal.Disclosure>
            )}
          </Dialog.Modal>
        </Modal.State>
      </div>
    </>
  )
}

export default FolderOptions
