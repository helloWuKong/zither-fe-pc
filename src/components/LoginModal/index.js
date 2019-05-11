import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.less'

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: '',
    }
    this.renderLoginModal = this.renderLoginModal.bind(this)
    this.createNode = this.createNode.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
  }

  componentDidMount() {
    this.createNode()
  }

  createNode() {
    if (!this.$el) {
      this.$el = document.createElement('div')
      document.body.appendChild(this.$el)
    }
  }

  handelValueChange(e, key) {
    this.setState({ [key]: e.target.value })
  }

  handleSubmitLogin() {
    const { username, password } = this.state
    const { onSubmitLogin } = this.props
    onSubmitLogin({ username, password })
  }

  renderLoginModal() {
    const { username, password } = this.state
    const { onClose, onRegister } = this.props
    return (
      <div className="mask">
        <div className="loginModal">
          <div className="headerModal">
            <span>登录</span>
            <span className="close" onClick={onClose}>X</span>
          </div>
          <div className="contentModal">
            <div className="userName">
              <span>账户名称</span>
              <input
                placeholder="    请输入用户名"
                onChange={(e) => { this.handelValueChange(e, 'username') }}
                value={username}
              />
            </div>
            <div className="password">
              <span>账户密码</span>
              <input
                placeholder="    请输入密码"
                onChange={(e) => { this.handelValueChange(e, 'password') }}
                value={password}
              />
            </div>
          </div>
          <div className="modal_footer">
            <button className="register_btn" onClick={onRegister}>注册</button>
            <button className="cancel_btn" onClick={onClose}>取消</button>
            <button className="login_btn" onClick={this.handleSubmitLogin}>登录</button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible } = this.props
    if (visible) {
      return ReactDOM.createPortal(this.renderLoginModal(), this.$el)
    }
    return null
  }
}

LoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
}
