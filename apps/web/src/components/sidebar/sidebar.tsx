import { EntitySwitcher } from './entity-switcher'
import { Nav, NavItem } from './nav'
import { PlatformNav } from './platform-nav'
import { UserDropdown } from './user-dropdown'
import { getUserEntities } from '@/data-layer/queries'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export async function Sidebar() {
  let entities = await getUserEntities()

  return (
    <div className="fixed left-0 top-0 z-20 flex size-full max-w-xs shrink-0 grow flex-col overflow-x-hidden border-r">
      <div className="flex h-16 cursor-pointer select-none items-center justify-start border-b px-8" />
      <div className="flex grow flex-col px-6 pb-4 pt-8">
        <div className="grow space-y-4">
          <EntitySwitcher entities={entities} />
          <PlatformNav />
        </div>
        <Nav>
          <NavItem href="/support" target="_blank" rel="noreferrer">
            <ChatBubbleIcon className="size-4" />
            <span>Get Feedback</span>
          </NavItem>
          <UserDropdown />
        </Nav>
      </div>
    </div>
  )
}
