import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSwitch,
  CBadge,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ErrorValidatorSignUp } from 'src/ServerRoute/FormValidator'
import axios from 'axios'
import { AdminRoute, AuthHeader } from 'src/ServerRoute/ServerRouteExport'

const Register = () => {
  const navigate = useNavigate()
  const [formSingup, setFormSingup] = useState({})
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const onChangeUserSign = (event) => {
    if (event.target.name === 'isActive') {
      setFormSingup((value) => ({ ...value, [event.target.name]: 'true' }))
    } else {
      setFormSingup((value) => ({ ...value, [event.target.name]: event.target.value }))
    }
  }

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      setIsSubmit(true)
    }
  }, [error])

  const onSubmitSignUp = () => {
    setError(ErrorValidatorSignUp(formSingup))
    if (Object.keys(error).length === 0 && isSubmit) {
      let mainD = formSingup
      delete mainD.cPassword
      // api calling
      axios
        .post(`${AdminRoute}signup`, mainD, AuthHeader)
        .then((result) => {
          let authVal = result.data.data.authToken
          window.localStorage.setItem('authToken', authVal)
          navigate('/dashboard')
        })
        .catch((err) => {
          console.log('some issue on data send ')
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CBadge color="transprent" textColor="danger">
                    Require *
                  </CBadge>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="name"
                      onChange={onChangeUserSign}
                      autoComplete="username"
                    />
                  </CInputGroup>
                  {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
                  <CBadge color="transprent" textColor="danger">
                    Require *
                  </CBadge>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      onChange={onChangeUserSign}
                      autoComplete="email"
                    />
                  </CInputGroup>
                  {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                  <CBadge color="transprent" textColor="danger">
                    Require *
                  </CBadge>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={onChangeUserSign}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                  <CBadge color="transprent" textColor="danger">
                    Require *
                  </CBadge>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="cPassword"
                      onChange={onChangeUserSign}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {error.cPassword && <p style={{ color: 'red' }}>{error.cPassword}</p>}
                  <CBadge color="transprent" textColor="danger">
                    Require *
                  </CBadge>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="role"
                      onChange={onChangeUserSign}
                      placeholder="your Secure Key"
                      autoComplete="SecureKey"
                    />
                  </CInputGroup>
                  {error.role && <p style={{ color: 'red' }}>{error.role}</p>}
                  <div>
                    <CFormLabel htmlFor="exampleFormControlInput9">User Status :</CFormLabel>
                    <CBadge color="transprent" textColor="danger">
                      Require *
                    </CBadge>
                    <CFormSwitch
                      label="Click At least once"
                      name="isActive"
                      onChange={onChangeUserSign}
                      id="formSwitchCheckChecked"
                    />
                    {error.isActive && <p style={{ color: 'red' }}>{error.isActive}</p>}
                  </div>
                  <div className="d-grid">
                    <CButton color="success" onClick={onSubmitSignUp}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
