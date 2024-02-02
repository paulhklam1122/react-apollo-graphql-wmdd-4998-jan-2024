const Title = () => {
  const styles = getStyles()

  return <h1 style={styles.title}>It's all about who you know!</h1>
}

const getStyles = () => ({
  title: {
    fontSize: 20,
    padding: '15px',
    marginBottom: '50px'
  }
})

export default Title
