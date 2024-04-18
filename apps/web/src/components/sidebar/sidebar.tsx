import { EntitySwitcher } from './entity-switcher'
import { Nav, NavItem } from './nav'
import { PlatformNav } from './platform-nav'
import { UserDropdown } from './user-dropdown'
import { getUserEntities } from '@/data-layer/queries'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export async function Sidebar() {
  let entities = await getUserEntities()

  return (
    <div className="flex max-w-xs shrink-0 grow flex-col border-r">
      <div className="flex h-16 cursor-pointer select-none items-center justify-start border-b px-8" />
      <div className="flex grow flex-row divide-x divide-border">
        <EntitySwitcher entities={entities} />
        <div className="flex w-full max-w-full grow flex-col overflow-y-auto px-3 py-4">
          <div className="grow">
            <PlatformNav entities={entities} />
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
    </div>
  )
}
