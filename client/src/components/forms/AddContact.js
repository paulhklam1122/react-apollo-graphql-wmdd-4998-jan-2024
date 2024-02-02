import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CONTACT, GET_CONTACTS } from '../../graphql/queries'

const AddContact = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addContact] = useMutation(ADD_CONTACT)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addContact({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addContact } }) => {
        const data = cache.readQuery({ query: GET_CONTACTS })

        cache.writeQuery({
          query: GET_CONTACTS,
          data: {
            ...data,
            contacts: [...data.contacts, addContact]
          }
        })
      }
    })
  }

  return (
    <Form
      name='add-contact-form'
      layout='inline'
      size='large'
      style={{ marginBottom: '40px' }}
      form={form}
      onFinish={onFinish}
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
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Contact
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddContact
