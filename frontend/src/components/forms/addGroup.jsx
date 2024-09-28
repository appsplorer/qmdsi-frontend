import { Form } from 'antd'
import React from 'react'
import TextInput from '../ui/input'
import TextareaInput from '../ui/textArea'
import SelectInput from '../ui/select'
import CustomDatePicker from '../ui/datePicker'

const AddGroupForm = ({setOpenCreateGroup}) => {
  return (
    <Form layout="vertical">
    <div className="w-full flex flex-col md:flex-row flex-nowrap gap-8">
      <div className="flex-1">
        <Form.Item label={<p className="text-white">Group Name</p>}>
          <TextInput />
        </Form.Item>
        <Form.Item label={<p className="text-white">Description</p>}>
          <TextareaInput rows={5} />
        </Form.Item>
        <Form.Item label={<p className="text-white">Maximum members</p>}>
          <TextInput type="number" />
        </Form.Item>
        <Form.Item label={<p className="text-white">Status</p>}>
          <SelectInput
            options={[
              { value: "Open", label: "Open" },
              { value: "Close", label: "Close" },
              { value: "In Progress", label: "In Progress" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex-1">
        <Form.Item label={<p className="text-white">Start Date</p>}>
         <CustomDatePicker  />
        </Form.Item>
        <Form.Item label={<p className="text-white">End Date</p>}>
        <CustomDatePicker  />
        </Form.Item>
        <Form.Item label={<p className="text-white">Total Funds</p>}>
        <TextInput type="number" />
        </Form.Item>
        <Form.Item
          label={<p className="text-white">Initial Contributions</p>}
        >
          <TextInput type="number" />
        </Form.Item>
        <Form.Item
          label={<p className="text-white">Monthly Contributions</p>}
        >
           <TextInput type="number" />
        </Form.Item>
      </div>
    </div>

    <div className="flex justify-end items-center gap-4">
      <button
        className="w-max whitespace-nowrap text-center animated-button text-md bg-ash border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-1 rounded-full"
        onClick={() => setOpenCreateGroup(false)}
      >
        Cancel
      </button>
      <button className="w-max whitespace-nowrap text-center animated-button text-md bg-golden border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-1 rounded-full">
        Submit
      </button>
    </div>
  </Form>
  )
}

export default AddGroupForm
