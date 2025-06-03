import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircle from '@mui/icons-material/CheckCircle';

interface DragItem {
  id: string;
  content: React.ReactNode;
  correctSpot: string;
  currentSpot: string | null;
}

interface DropSpot {
  id: string;
  itemId: string | null;
}

const DragContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const DraggableItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: 'center',
  cursor: 'grab',
  userSelect: 'none',
  transition: 'all 0.3s ease',
  '&:active': {
    cursor: 'grabbing',
    transform: 'scale(1.05)',
  },
}));

const DropArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  minHeight: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderColor: theme.palette.primary.main,
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
}));

export default function DragAndDropGame() {
  const { t } = useTranslation();
  const [gameStarted, setGameStarted] = useState(false);
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [dropSpots, setDropSpots] = useState<DropSpot[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const shapes = [
    { id: 'square', name: 'Carré', color: '#3f51b5' },
    { id: 'circle', name: 'Cercle', color: '#4caf50' },
    { id: 'triangle', name: 'Triangle', color: '#f44336' },
  ];

  const renderShape = (shapeId: string, color: string) => {
    switch (shapeId) {
      case 'square':
        return (
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: color,
              margin: '0 auto',
            }}
          />
        );
      case 'circle':
        return (
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: color,
              borderRadius: '50%',
              margin: '0 auto',
            }}
          />
        );
      case 'triangle':
        return (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '30px solid transparent',
              borderRight: '30px solid transparent',
              borderBottom: `60px solid ${color}`,
              margin: '0 auto',
            }}
          />
        );
      default:
        return null;
    }
  };

  const initializeGame = () => {
    const items = shapes.map(shape => ({
      id: `item_${shape.id}`,
      content: renderShape(shape.id, shape.color),
      correctSpot: `spot_${shape.id}`,
      currentSpot: null,
    }));

    const spots = shapes.map(shape => ({ id: `spot_${shape.id}`, itemId: null }));
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    setDragItems(shuffledItems);
    setDropSpots(spots);
    setGameCompleted(false);
    setScore(0);
  };

  const startGame = () => {
    initializeGame();
    setGameStarted(true);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('itemId', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, spotId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const spot = dropSpots.find(s => s.id === spotId);

    if (spot && spot.itemId) return;

    const updatedSpots = dropSpots.map(s =>
      s.id === spotId ? { ...s, itemId } : s
    );

    const updatedItems = dragItems.map(item =>
      item.id === itemId ? { ...item, currentSpot: spotId } : item
    );

    setDropSpots(updatedSpots);
    setDragItems(updatedItems);

    const allPlaced = updatedItems.every(item => item.currentSpot !== null);
    if (allPlaced) checkResults(updatedItems);
  };

  const checkResults = (items: DragItem[]) => {
    let correctCount = 0;
    items.forEach(item => {
      if (item.currentSpot === item.correctSpot) correctCount++;
    });
    setScore(correctCount);
    setGameCompleted(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const getShapeName = (spotId: string) => {
    const shapeId = spotId.replace('spot_', '');
    const shape = shapes.find(s => s.id === shapeId);
    return shape ? shape.name : '';
  };

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
              bgcolor: 'primary.main',
              borderRadius: '2px',
            },
          }}
        >
          Glisser-Déposer les Formes
        </Typography>

        <Box>
          {!gameStarted ? (
            <Button variant="contained" color="primary" onClick={startGame}>
              {t("Démarrer")}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={startGame}
              sx={{ mr: 1 }}
            >
              Recommencer
            </Button>
          )}
        </Box>
      </Box>

      {gameCompleted && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: 'primary.light',
            borderRadius: 2,
            textAlign: 'center',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0.4)' },
              '70%': { boxShadow: '0 0 0 10px rgba(33, 150, 243, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(33, 150, 243, 0)' },
            },
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
            {score === shapes.length ? 'Bravo !' : 'Essaie encore !'}
          </Typography>
          <Typography variant="body1">
            Score: {score}/{shapes.length}
          </Typography>
        </Box>
      )}

      {gameStarted && (
        <DragContainer>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Glisse chaque forme à son nom correspondant.
          </Typography>

          <Grid container spacing={3}>
            {/* Zone de glissement */}
            <Grid {...({} as any)} item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {dragItems
                  .filter(item => !item.currentSpot)
                  .map(item => (
                    <DraggableItem
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      elevation={3}
                      sx={{ width: 100, height: 100, display: 'flex', alignItems: 'center' }}
                    >
                      {item.content}
                    </DraggableItem>
                  ))}
              </Box>
            </Grid>

            {/* Zones de dépôt */}
            <Grid {...({} as any)} item xs={12} md={6}>
              <Grid container spacing={2}>
                {dropSpots.map(spot => {
                  const placedItem = dragItems.find(item => item.currentSpot === spot.id);
                  return (
                    <Grid {...({} as any)} item xs={12} key={spot.id}>
                      <DropArea
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, spot.id)}
                        sx={{
                          borderStyle: placedItem ? 'solid' : 'dashed',
                          borderColor: placedItem
                            ? placedItem.correctSpot === spot.id
                              ? 'success.main'
                              : 'error.main'
                            : 'primary.main',
                          bgcolor: placedItem
                            ? placedItem.correctSpot === spot.id
                              ? 'rgba(76, 175, 80, 0.1)'
                              : 'rgba(244, 67, 54, 0.1)'
                            : 'rgba(33, 150, 243, 0.05)',
                        }}
                      >
                        {placedItem ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {placedItem.content}
                            {placedItem.correctSpot === spot.id && (
                              <CheckCircle color="success" fontSize="small" />
                            )}
                          </Box>
                        ) : (
                          <Typography>{getShapeName(spot.id)}</Typography>
                        )}
                      </DropArea>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </DragContainer>
      )}
    </Paper>
  );
}