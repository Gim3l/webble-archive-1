import deleteResourceFolder from "app/modules/resource/mutations/deleteResourceFolder"
import { Router, useMutation } from "blitz"
import { Card, Text, Box, Heading, Button, Table } from "bumbag"
import React from "react"
import { useStore } from "utils/store"
import useClassroomFolders from "../../classroom/hooks/useClassroomFolders"
import useCurrentClassroom from "../../classroom/hooks/useCurrentClassroom"
import FolderOptions from "../../classroom/components/FolderOptions"
import { humanFileSize } from "utils/files"
import { Link } from "blitz"
import { File } from "db"

type FolderProps = {
  id: number
  name: string
  colour: string
  refetch: () => any
  handleClick: () => any
}

const Folder = (props: FolderProps) => {
  const [deleteResourceFolderMutation] = useMutation(deleteResourceFolder)
  const onDelete = async () => {
    await deleteResourceFolderMutation({ where: { id: props.id } })
    props.refetch()
  }

  // onEdit = async () => {}
  return (
    <div onClick={props.handleClick} onKeyDown={props.handleClick} role="button" tabIndex={0}>
      <Card
        cursor="pointer"
        height="150px"
        variant="bordered"
        background={props.colour}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box position="absolute" top="0" right="0" margin="5px">
          <FolderOptions
            refetch={props.refetch}
            folder={{ name: props.name, colour: props.colour, id: props.id }}
            onDelete={onDelete}
          ></FolderOptions>
        </Box>
        <Text>{props.name}</Text>
      </Card>
    </div>
  )
}

const FileTable = (props) => {
  return (
    <Table isHoverable>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell textAlign="right">Size</Table.HeadCell>
          <Table.HeadCell textAlign="right">Action</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {props.files.map((file: File) => (
          <Table.Row>
            <Table.Cell>{file.name}</Table.Cell>
            <Table.Cell textAlign="right">{humanFileSize(file.size, true)}</Table.Cell>
            <Table.Cell textAlign="right">
              <Link href={"/api/download/" + file.path}>
                <Button size="small">Download</Button>
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const FileBrowserBox = () => {
  const setCurrentFolder: any = useStore((state) => state.setCurrentFolder)
  const currentFolder: any = useStore((state) => state.currentFolder)
  const currentClassroom = useCurrentClassroom()
  const [selectedFolder, setSelectedFolder] = React.useState<any>(null)
  const [folders, { refetch }] = useClassroomFolders({
    where: { classroomId: currentClassroom?.id },
    include: { files: true },
  })

  return (
    <Box display="grid" gridColumnGap="10px">
      {!currentFolder && (
        <Box
          variant="bordered"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, 150px)"
          gridColumnGap="20px"
          gridRowGap="20px"
          minWidth="500px"
        >
          {folders.map((folder) => (
            <Folder
              id={folder.id}
              name={folder.name}
              colour={folder.colour}
              refetch={refetch}
              handleClick={() => setCurrentFolder(folder)}
            ></Folder>
          ))}
        </Box>
      )}
      {currentFolder && (
        <Card variant="bordered">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Heading use="h5">{currentFolder?.name}</Heading>
            <Button onClick={() => setCurrentFolder(null)} size="small">
              Back
            </Button>
          </Box>
          <Text>{currentFolder?.name}</Text>
          <FileTable files={currentFolder.files}></FileTable>
        </Card>
      )}
    </Box>
  )
}

export default FileBrowserBox
