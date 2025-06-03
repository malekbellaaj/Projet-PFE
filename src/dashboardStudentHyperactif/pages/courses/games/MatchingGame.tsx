import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Home, RefreshCcw } from 'lucide-react';

interface MatchItem {
  id: string;
  content: string;
  matched: boolean;
  value: string;
}

const GameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const MatchingItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
  },
}));

export default function MatchingGame() {
  const { t } = useTranslation();
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [items, setItems] = useState<MatchItem[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Sample data for the matching game
  const matchingPairs = [
    { left: '34', right: '3 dizaines 4 unités' },
    { left: '81', right: '8 dizaines 1 unité' },
    { left: '43', right: '4 dizaines 3 unités' },
    { left: '70', right: '7 dizaines 0 unité' },
    { left: '12', right: '1 dizaine 2 unités' },
    { left: '98', right: '9 dizaines 8 unités' },
  ];

  const initializeGame = () => {
    const leftItems: MatchItem[] = matchingPairs.map((pair, index) => ({
      id: `left_${index}`,
      content: pair.left,
      matched: false,
      value: pair.left,
    }));

    const rightItems: MatchItem[] = matchingPairs.map((pair, index) => ({
      id: `right_${index}`,
      content: pair.right,
      matched: false,
      value: pair.left, // The value to match
    }));

    // Shuffle both arrays
    const shuffledLeftItems = leftItems.sort(() => Math.random() - 0.5);
    const shuffledRightItems = rightItems.sort(() => Math.random() - 0.5);

    setItems([...shuffledLeftItems, ...shuffledRightItems]);
    setSelectedItems([]);
    setCompleted(false);
    setScore(0);
  };

  const startGame = () => {
    initializeGame();
    setGameStarted(true);
  };

  const handleItemClick = (id: string) => {
    // If already matched or selected, do nothing
    const clickedItem = items.find(item => item.id === id);
    if (!clickedItem || clickedItem.matched || selectedItems.includes(id)) return;

    // Add to selected items
    const newSelectedItems = [...selectedItems, id];
    setSelectedItems(newSelectedItems);

    // If we have selected 2 items, check for a match
    if (newSelectedItems.length === 2) {
      const firstItem = items.find(item => item.id === newSelectedItems[0]);
      const secondItem = items.find(item => item.id === newSelectedItems[1]);

      if (firstItem && secondItem) {
        // Check if they have the same value and are from different sides (left/right)
        const isMatch = 
          firstItem.value === secondItem.value && 
          firstItem.id.startsWith('left_') !== secondItem.id.startsWith('left_');

        if (isMatch) {
          // Match found
          const updatedItems = items.map(item => 
            newSelectedItems.includes(item.id) ? { ...item, matched: true } : item
          );
          setItems(updatedItems);
          setScore(prev => prev + 1);

          // Check if all items are matched
          const allMatched = updatedItems.every(item => item.matched);
          if (allMatched) {
            setCompleted(true);
          }
        }

        // Clear selection after a short delay
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h5" 
          component="h2"
          sx={{ 
            fontWeight: 'bold',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '40px',
              height: '4px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px'
            }
          }}
        >
          Jeu d'Association
        </Typography>

        <Box>
          {!gameStarted ? (
            <Button 
              variant="contained" 
              color="secondary"
              onClick={startGame}
            >
              {t('game.start')}
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              color="secondary"
              startIcon={<RefreshCcw size={18} />}
              onClick={startGame}
              sx={{ mr: 1 }}
            >
              Recommencer
            </Button>
          )}
        </Box>
      </Box>

      {completed && (
        <Box 
          sx={{ 
            mb: 3, 
            p: 2, 
            backgroundColor: 'secondary.light', 
            borderRadius: 2,
            textAlign: 'center',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(255, 152, 0, 0.4)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(255, 152, 0, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(255, 152, 0, 0)',
              },
            },
          }}
        >
          <Typography variant="h6" sx={{ color: 'secondary.dark', fontWeight: 'bold' }}>
            {t('game.complete')}
          </Typography>
          <Typography variant="body1">
            Score: {score}/{matchingPairs.length}
          </Typography>
        </Box>
      )}

      {gameStarted && (
        <GameContainer>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Fais glisser les pièces de puzzle qui sont à droite.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid {...({} as any)} item xs={12} md={6}>
              <Grid container spacing={2}>
                {items
                  .filter(item => item.id.startsWith('left_'))
                  .map(item => (
                    <Grid {...({} as any)} item xs={6} key={item.id}>
                      <MatchingItem 
                        onClick={() => handleItemClick(item.id)}
                        sx={{
                          backgroundColor: item.matched ? 'rgba(76, 175, 80, 0.1)' : 'white',
                          borderColor: selectedItems.includes(item.id) 
                            ? 'primary.main' 
                            : item.matched 
                              ? 'success.main' 
                              : 'transparent',
                          fontWeight: 'bold',
                          fontSize: '1.5rem',
                        }}
                      >
                        {item.content}
                      </MatchingItem>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            
            <Grid {...({} as any)} item xs={12} md={6}>
              <Grid container spacing={2}>
                {items
                  .filter(item => item.id.startsWith('right_'))
                  .map(item => (
                    <Grid {...({} as any)} item xs={6} key={item.id}>
                      <MatchingItem 
                        onClick={() => handleItemClick(item.id)}
                        sx={{
                          backgroundColor: item.matched ? 'rgba(76, 175, 80, 0.1)' : '#e3f2fd',
                          borderColor: selectedItems.includes(item.id) 
                            ? 'primary.main' 
                            : item.matched 
                              ? 'success.main' 
                              : 'transparent',
                        }}
                      >
                        {item.content}
                      </MatchingItem>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </GameContainer>
      )}
    </Paper>
  );
}