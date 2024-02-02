import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../graphql/queries'
import filter from 'lodash.filter'

const RemoveContact = ({ id }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    update(cache, { data: { removeContact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS })

      cache.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, c => {
            return c.id !== removeContact.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')

    if (result) {
      removeContact({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
}

export default RemoveContact
