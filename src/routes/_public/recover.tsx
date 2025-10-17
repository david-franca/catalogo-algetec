import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/recover')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forgot-password"!</div>
}
