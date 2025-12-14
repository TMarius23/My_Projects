# multiAgents.py
# --------------
# Licensing Information:  You are free to use or extend these projects for
# educational purposes provided that (1) you do not distribute or publish
# solutions, (2) you retain this notice, and (3) you provide clear
# attribution to UC Berkeley, including a link to http://ai.berkeley.edu.
# 
# Attribution Information: The Pacman AI projects were developed at UC Berkeley.
# The core projects and autograders were primarily created by John DeNero
# (denero@cs.berkeley.edu) and Dan Klein (klein@cs.berkeley.edu).
# Student side autograding was added by Brad Miller, Nick Hay, and
# Pieter Abbeel (pabbeel@cs.berkeley.edu).
import game
from util import manhattanDistance
from game import Directions
import random, util

from game import Agent
from pacman import GameState

class ReflexAgent(Agent):
    """
    A reflex agent chooses an action at each choice point by examining
    its alternatives via a state evaluation function.

    The code below is provided as a guide.  You are welcome to change
    it in any way you see fit, so long as you don't touch our method
    headers.
    """


    def getAction(self, gameState: GameState):
        """
        You do not need to change this method, but you're welcome to.

        getAction chooses among the best options according to the evaluation function.

        Just like in the previous project, getAction takes a GameState and returns
        some Directions.X for some X in the set {NORTH, SOUTH, WEST, EAST, STOP}
        """
        # Collect legal moves and successor states
        legalMoves = gameState.getLegalActions()

        # Choose one of the best actions
        scores = [self.evaluationFunction(gameState, action) for action in legalMoves]
        bestScore = max(scores)
        bestIndices = [index for index in range(len(scores)) if scores[index] == bestScore]
        chosenIndex = random.choice(bestIndices) # Pick randomly among the best

        "Add more of your code here if you want to"

        return legalMoves[chosenIndex]

    def evaluationFunction(self, currentGameState: GameState, action):
        """
        Design a better evaluation function here.

        The evaluation function takes in the current and proposed successor
        GameStates (pacman.py) and returns a number, where higher numbers are better.

        The code below extracts some useful information from the state, like the
        remaining food (newFood) and Pacman position after moving (newPos).
        newScaredTimes holds the number of moves that each ghost will remain
        scared because of Pacman having eaten a power pellet.

        Print out these variables to see what you're getting, then combine them
        to create a masterful evaluation function.
        """
        # Useful information you can extract from a GameState (pacman.py)
        successorGameState = currentGameState.generatePacmanSuccessor(action)
        newPos = successorGameState.getPacmanPosition()
        newFood = successorGameState.getFood()
        newGhostStates = successorGameState.getGhostStates()
        newScaredTimes = [ghostState.scaredTimer for ghostState in newGhostStates]

        "*** YOUR CODE HERE ***"

        print(newPos)
        print(newFood)
        print(newGhostStates)
        print(newScaredTimes)
        print(successorGameState)

        score = successorGameState.getScore()

        if action == Directions.STOP:
            score -= 10

        if len(newFood.asList()) > 0:
            distMancare = min([util.manhattanDistance(newPos, food) for food in newFood.asList()])
            score += 1 / distMancare

        for fantoma in newGhostStates:
            fantomaPoz = fantoma.getPosition()
            distanta = manhattanDistance(newPos, fantomaPoz)
            if fantoma.scaredTimer == 0:
                if distanta <= 1:
                    return -99999
                else:
                    score -= 1 / distanta
            else:
                score += 10.0 / distanta

        return score

def scoreEvaluationFunction(currentGameState: GameState):
    """
    This default evaluation function just returns the score of the state.
    The score is the same one displayed in the Pacman GUI.

    This evaluation function is meant for use with adversarial search agents
    (not reflex agents).
    """
    return currentGameState.getScore()

class MultiAgentSearchAgent(Agent):
    """
    This class provides some common elements to all of your
    multi-agent searchers.  Any methods defined here will be available
    to the MinimaxPacmanAgent, AlphaBetaPacmanAgent & ExpectimaxPacmanAgent.

    You *do not* need to make any changes here, but you can if you want to
    add functionality to all your adversarial search agents.  Please do not
    remove anything, however.

    Note: this is an abstract class: one that should not be instantiated.  It's
    only partially specified, and designed to be extended.  Agent (game.py)
    is another abstract class.
    """

    def __init__(self, evalFn = 'scoreEvaluationFunction', depth = '2'):
        self.index = 0 # Pacman is always agent index 0
        self.evaluationFunction = util.lookup(evalFn, globals())
        self.depth = int(depth)

class MinimaxAgent(MultiAgentSearchAgent):
    """
    Your minimax agent (question 2)
    """

    def maxim (self, gameState, depth, agentIndex):
        bestScore = -float('inf')
        bestAction = None

        numarAgent = gameState.getNumAgents()

        adancime_urm = depth
        agent_urm = agentIndex
        if numarAgent == (agentIndex - 1):
            adancime_urm += 1
            agent_urm = 0
        else:
            adancime_urm = depth
            agent_urm += 1

        for action in gameState.getLegalActions(0):
            succesor = gameState.generateSuccessor(0, action)
            scor, _ = self.minmax(succesor, adancime_urm, agent_urm)

            if scor > bestScore:
                bestScore = scor
                bestAction = action

        return bestScore, bestAction

    def minim(self, gameState, depth, agentIndex):
        bestScore = float('inf')
        numarAgent = gameState.getNumAgents()
        bestAction = None

        for action in gameState.getLegalActions(agentIndex):
            succesor = gameState.generateSuccessor(agentIndex, action)

            if agentIndex < (numarAgent - 1):
                scor, _ = self.minmax(succesor, depth, agentIndex + 1)
            else:
                scor, _ = self.minmax(succesor, depth + 1, 0)

            if scor < bestScore:
                bestScore = scor
                bestAction = action

        return bestScore, bestAction

    def minmax(self, gameState, depth, agentIndex):

        if depth == self.depth:
            return self.evaluationFunction(gameState), None

        if gameState.isWin() or gameState.isLose():
            return self.evaluationFunction(gameState), None

        if agentIndex == 0:
            return self.maxim(gameState, depth, agentIndex)

        if agentIndex > 0:
            return self.minim(gameState, depth, agentIndex)


    def getAction(self, gameState: GameState):
        """
        Returns the minimax action from the current gameState using self.depth
        and self.evaluationFunction.

        Here are some method calls that might be useful when implementing minimax.

        gameState.getLegalActions(agentIndex):
        Returns a list of legal actions for an agent
        agentIndex=0 means Pacman, ghosts are >= 1

        gameState.generateSuccessor(agentIndex, action):
        Returns the successor game state after an agent takes an action

        gameState.getNumAgents():
        Returns the total number of agents in the game

        gameState.isWin():
        Returns whether or not the game state is a winning state

        gameState.isLose():
        Returns whether or not the game state is a losing state
        """
        "*** YOUR CODE HERE ***"

        # util.raiseNotDefined()
        bestAction = None
        bestScor = -9999


        for action in gameState.getLegalActions(0):
            succ = gameState.generateSuccessor(0, action)
            score, _ = self.minmax(succ, 0, 1)
            if score > bestScor:
                bestScor = score
                bestAction = action

        return bestAction

class AlphaBetaAgent(MultiAgentSearchAgent):
    """
    Your minimax agent with alpha-beta pruning (question 3)
    """

    def maxim (self, gameState, depth, agentIndex, alpha, beta):
        v = -float('inf')
        for action in gameState.getLegalActions(agentIndex):
            succesor = gameState.generateSuccessor(agentIndex, action)
            score = self.alfaBeta(succesor, depth, 1, alpha, beta)
            v = max(score, v)
            if v > beta:
                return v
            alpha = max(alpha, v)

        return v


    def minim(self, gameState, depth, agentIndex, alpha, beta):
        v = float('inf')
        numarAgent = gameState.getNumAgents()

        for action in gameState.getLegalActions(agentIndex):
            succesor = gameState.generateSuccessor(agentIndex, action)
            if agentIndex == (numarAgent - 1):
                score = self.alfaBeta(succesor, depth + 1, 0, alpha, beta)
            else:
                score = self.alfaBeta(succesor, depth, agentIndex + 1, alpha, beta)

            v = min(score, v)
            if v < alpha:
                return v
            beta = min(beta, v)

        return v

    def alfaBeta(self, gameState, depth, agentIndex, alpha, beta):

        if depth == self.depth:
            return self.evaluationFunction(gameState)

        if gameState.isWin() or gameState.isLose():
            return self.evaluationFunction(gameState)

        if agentIndex == 0:
            return self.maxim(gameState, depth, agentIndex, alpha, beta)

        if agentIndex > 0:
            return self.minim(gameState, depth, agentIndex, alpha, beta)


    def getAction(self, gameState: GameState):
        """
        Returns the minimax action using self.depth and self.evaluationFunction
        """
        "*** YOUR CODE HERE ***"
        # util.raiseNotDefined()
        bestAction = None
        bestScor = -float('inf')
        alpha = -float('inf')
        beta = float('inf')

        for action in gameState.getLegalActions(0):
            succ = gameState.generateSuccessor(0, action)
            score = self.alfaBeta(succ, 0, 1, alpha, beta)
            if score > bestScor:
                bestScor = score
                bestAction = action
            alpha = max(alpha, bestScor)

        return bestAction


class ExpectimaxAgent(MultiAgentSearchAgent):
    """
      Your expectimax agent (question 4)
    """

    def getAction(self, gameState: GameState):
        """
        Returns the expectimax action using self.depth and self.evaluationFunction

        All ghosts should be modeled as choosing uniformly at random from their
        legal moves.
        """
        "*** YOUR CODE HERE ***"
        util.raiseNotDefined()

def betterEvaluationFunction(currentGameState: GameState):
    """
    Your extreme ghost-hunting, pellet-nabbing, food-gobbling, unstoppable
    evaluation function (question 5).

    DESCRIPTION: <write something here so we know what you did>
    """
    "*** YOUR CODE HERE ***"
    util.raiseNotDefined()

# Abbreviation
better = betterEvaluationFunction
