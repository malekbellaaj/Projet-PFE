
import { ReactElement, useState, useEffect } from 'react';
import {
  Collapse,
  LinkTypeMap,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import IconifyIcon from '../../../components/base/IconifyIcon';
import { useLocation } from 'react-router-dom';
import { NavItem } from '../../../data/nav-items';

interface NavItemProps {
  navItem: NavItem;
  Link: OverridableComponent<LinkTypeMap>;
}

const NavButton = ({ navItem, Link }: NavItemProps): ReactElement => {
  const { pathname } = useLocation();
  // Vérifie si un sous-élément est actif pour ouvrir le sous-menu
  const isSubItemActive = navItem.sublist ? navItem.sublist.some((subItem) => pathname === subItem.path) : false;
  const [checked, setChecked] = useState(isSubItemActive);
  const [nestedChecked, setNestedChecked] = useState<boolean[]>([]);

  // Ouvre automatiquement le sous-menu si un sous-élément est actif
  useEffect(() => {
    setChecked(isSubItemActive);
  }, [isSubItemActive]);

  const handleNestedChecked = (index: number, value: boolean) => {
    const updatedBooleanArray = [...nestedChecked];
    updatedBooleanArray[index] = value;
    setNestedChecked(updatedBooleanArray);
  };

  // Surlignage uniquement pour l'élément principal (si pas de sous-menu)
  const isActive = pathname === navItem.path;

  return (
    <ListItem
      sx={{
        my: 1.25,
        borderRadius: 2,
        backgroundColor: isActive ? 'primary.main' : '', // Surlignage uniquement si l'élément principal est actif
        color: isActive ? 'common.white' : 'text.secondary',
        '&:hover': {
          backgroundColor: isActive ? 'primary.main' : 'action.focus',
          opacity: 1,
        },
      }}
    >
      {navItem.collapsible ? (
        <>
          {/* Bouton sans lien pour les éléments collapsible, sert uniquement à ouvrir/fermer */}
          <ListItemButton onClick={() => setChecked(!checked)}>
            <ListItemIcon>
              <IconifyIcon icon={navItem.icon as string} width={1} height={1} />
            </ListItemIcon>
            <ListItemText>{navItem.title}</ListItemText>
            <ListItemIcon>
              {navItem.collapsible &&
                (checked ? (
                  <IconifyIcon icon="mingcute:up-fill" width={1} height={1} />
                ) : (
                  <IconifyIcon icon="mingcute:down-fill" width={1} height={1} />
                ))}
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={checked}>
            <List>
              {navItem.sublist?.map((subListItem, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    backgroundColor: pathname === subListItem.path ? 'primary.main' : '', // Surlignage pour le sous-élément actif
                    color: pathname === subListItem.path ? 'common.white' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: pathname === subListItem.path ? 'primary.main' : 'action.focus',
                      opacity: 1,
                    },
                  }}
                >
                  {subListItem.collapsible ? (
                    <>
                      <ListItemButton
                        onClick={() => handleNestedChecked(idx, !nestedChecked[idx])}
                      >
                        <ListItemText sx={{ ml: 3.5 }}>{subListItem.title}</ListItemText>
                        <ListItemIcon>
                          {subListItem.collapsible &&
                            (nestedChecked[idx] ? (
                              <IconifyIcon icon="mingcute:up-fill" width={1} height={1} />
                            ) : (
                              <IconifyIcon icon="mingcute:down-fill" width={1} height={1} />
                            ))}
                        </ListItemIcon>
                      </ListItemButton>
                      <Collapse in={nestedChecked[idx]}>
                        <List>
                          {subListItem?.sublist?.map((nestedSubListItem, nestedIdx) => (
                            <ListItem key={nestedIdx}>
                              <ListItemButton
                                LinkComponent={Link}
                                href={nestedSubListItem.path}
                              >
                                <ListItemText sx={{ ml: 5 }}>{nestedSubListItem.title}</ListItemText>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <ListItemButton
                      LinkComponent={Link}
                      href={subListItem.path}
                    >
                      <ListItemText sx={{ ml: 3 }}>{subListItem.title}</ListItemText>
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton
          LinkComponent={Link}
          href={navItem.path}
          sx={{ opacity: isActive ? 1 : 0.6 }}
        >
          <ListItemIcon>
            <IconifyIcon icon={navItem.icon as string} width={1} height={1} />
          </ListItemIcon>
          <ListItemText>{navItem.title}</ListItemText>
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default NavButton;