import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_CONTACT } from '../../graphql/queries'

const UpdateContact = props => {
  const { id, firstName, lastName } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateContact] = useMutation(UPDATE_CONTACT)

  const onFinish = values => {
    const { firstName, lastName } = values

    updateContact({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    props.onButtonClick()
  }

  useEffect(() => {
    forceUpdate()
  }, [])

  return (
    <Form
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please enter a first name' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            form={form}
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateContact
