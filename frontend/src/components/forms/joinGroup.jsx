import { Checkbox, Form } from 'antd'
import React from 'react'
import TextInput from '../ui/input'
import SelectInput from '../ui/select'

const JoinGroupForm = ({selectedRoom,setOpenJoinGroup}) => {

    const handleJoinSubmit = async(values) =>{
        console.log("User Details for Joining Group:", values);
        // Handle the logic to join the group with `selectedRoom` and user details
    
        // Close the modal after submission
        setOpenJoinGroup(false);
    }
  return (
    <Form layout="vertical" onFinish={handleJoinSubmit}>
    <div className="flex flex-nowrap gap-12">
      <div className="flex-1">
        <Form.Item
          label={<p className="text-white">Group Room ID</p>}
          name="roomId"
          initialValue={selectedRoom?.roomId}
        >
          <TextInput readOnly={true} />
        </Form.Item>

        <Form.Item
          label={<p className="text-white">Group Name</p>}
          name="groupName"
          initialValue={`Group ${selectedRoom?.roomId}`}
        >
          <TextInput readOnly={true} />
        </Form.Item>

        <Form.Item
          label={<p className="text-white">Maturity Date</p>}
        >
          <TextInput />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
        >
          <Checkbox>
            <p className="text-white">
              I agree to the terms and conditions
            </p>
          </Checkbox>
        </Form.Item>
      </div>
    </div>

    <div className="flex justify-end items-center gap-4">
      <button
        type="button"
        className="w-max whitespace-nowrap text-center animated-button text-md bg-ash border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-1 rounded-full"
        onClick={() => setOpenJoinGroup(false)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="w-max whitespace-nowrap text-center animated-button text-md bg-golden border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-1 rounded-full"
      >
        Join
      </button>
    </div>
  </Form>
  )
}

export default JoinGroupForm
