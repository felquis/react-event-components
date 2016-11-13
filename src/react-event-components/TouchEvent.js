const { Component, PropTypes } = require('react')

class Touch extends Component {
  componentDidMount() {
    this.target = this.props.children ? this.refs.target : document

    if (Array.isArray(this.props.when)) {
      this.props.when.forEach(this.addEvent.bind(this))

      return
    }

    this.addEvent(this.props.when)
  }

  componentWillUnmount() {
    if (Array.isArray(this.props.when)) {
      this.props.when.forEach(this.removeEvent.bind(this))

      return
    }

    this.removeEvent(this.props.when)
  }

  addEvent(eventName) {
    this.target.addEventListener(`touch${eventName}`, this.props.do)
  }

  removeEvent(eventName) {
    this.target.removeEventListener(`touch${eventName}`, this.props.do)
  }

  render() {
    return null
  }
}

const validEvents = ['start', 'move', 'end', 'cancel']

Touch.propTypes = {
  /**
   * Touch event to trigger the callback
   * @type {String}
   */
  when: PropTypes.oneOfType([
    PropTypes.oneOf(validEvents).isRequired,
    PropTypes.arrayOf(PropTypes.oneOf(validEvents)).isRequired
  ]),
  /**
   * Triggered when the key is pressed
   * @type {Function}
   */
  do: PropTypes.func.isRequired
}

module.exports = Touch
