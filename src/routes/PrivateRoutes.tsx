import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Pets } from '../pages'
import { AuthLayout } from '../shared/layouts'

export const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <AuthLayout>
            <Home />
          </AuthLayout>
        }
      />

      <Route
        path="/pets"
        element={
          <AuthLayout>
            <Pets />
          </AuthLayout>
        }
      />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
