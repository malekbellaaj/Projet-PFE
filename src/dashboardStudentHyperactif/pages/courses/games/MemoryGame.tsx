

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Sparkles, Timer, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Card {
  id: number;
  type: string;
  flipped: boolean;
  matched: boolean;
}

const StyledCard = styled(Paper)(({ theme }) => ({
  height: 100,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6],
  },
}));

const CardFront = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s',
}));

const CardBack = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  fontSize: '2rem',
  fontWeight: 'bold',
  border: `2px solid ${theme.palette.primary.main}`,
  transition: 'all 0.3s',
}));

export default function MemoryGame() {
  const { t } = useTranslation();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const cardTypes = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥝', '🍍'];
  const totalPairs = 6;

  const initializeGame = () => {
    const selectedCardTypes = cardTypes.slice(0, totalPairs);
    let newCards: Card[] = [];
    
    selectedCardTypes.forEach((type, index) => {
      // Create a pair of cards with the same type
      newCards.push({
        id: index * 2,
        type,
        flipped: false,
        matched: false,
      });
      
      newCards.push({
        id: index * 2 + 1,
        type,
        flipped: false,
        matched: false,
      });
    });
    
    // Shuffle the cards
    newCards = newCards.sort(() => Math.random() - 0.5);
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setGameComplete(false);
  };

  const startGame = () => {
    initializeGame();
    setGameStarted(true);
  };

  const resetGame = () => {
    initializeGame();
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    // Don't allow clicking if two cards are already flipped and being checked
    if (flippedCards.length === 2) return;
    
    // Don't allow clicking on already matched or flipped cards
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.matched || clickedCard.flipped) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const firstCard = cards.find(card => card.id === newFlippedCards[0]);
      const secondCard = cards.find(card => card.id === newFlippedCards[1]);
      
      if (firstCard && secondCard && firstCard.type === secondCard.type) {
        // Match found
        setTimeout(() => {
          const matchedCards = cards.map(card => 
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1]
              ? { ...card, matched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prevPairs => {
            const newPairs = prevPairs + 1;
            if (newPairs === totalPairs) {
              setGameComplete(true);
            }
            return newPairs;
          });
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = cards.map(card => 
            card.id === newFlippedCards[0] || card.id === newFlippedCards[1]
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: number;
    
    if (gameStarted && !gameComplete) {
      interval = window.setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameComplete]);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              backgroundColor: 'tertiary.main',
              borderRadius: '2px'
            }
          }}
        >
          Jeu de Mémoire
        </Typography>
        
        {!gameStarted ? (
          <Button 
            variant="contained" 
            color="info"
            startIcon={<Sparkles size={20} />}
            onClick={startGame}
          >
            {t('game.start')}
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            color="info"
            startIcon={<RotateCcw size={20} />}
            onClick={resetGame}
          >
            Recommencer
          </Button>
        )}
      </Box>
      
      {gameStarted && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Chip 
            icon={<Timer size={16} />}
            label={formatTime(timer)}
            color="primary"
            variant="outlined"
          />
          
          <Chip 
            label={`Mouvements: ${moves}`}
            color="secondary"
            variant="outlined"
          />
          
          <Chip 
            label={`Paires: ${matchedPairs}/${totalPairs}`}
            color="info"
            variant="outlined"
          />
        </Box>
      )}
      
      {gameComplete && (
        <Box 
          sx={{ 
            mb: 3, 
            p: 2, 
            backgroundColor: 'tertiary.light', 
            borderRadius: 2,
            textAlign: 'center',
            animation: 'pulse 1.5s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
              },
            },
          }}
        >
          <Typography variant="h6" sx={{ color: 'tertiary.dark', fontWeight: 'bold' }}>
            {t('game.complete')}
          </Typography>
          <Typography variant="body1">
            Temps: {formatTime(timer)} | Mouvements: {moves}
          </Typography>
        </Box>
      )}
      
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid {...({} as any)} item xs={12} sm={6} md={3} key={index}>
            <StyledCard
              onClick={() => handleCardClick(card.id)}
              elevation={card.flipped || card.matched ? 3 : 1}
              sx={{
                transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0)',
              }}
            >
              {!card.flipped && !card.matched ? (
                <CardFront>?</CardFront>
              ) : (
                <CardBack>{card.type}</CardBack>
              )}
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}