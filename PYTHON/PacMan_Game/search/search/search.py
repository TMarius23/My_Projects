# search.py
# ---------
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


"""
In search.py, you will implement generic search algorithms which are called by
Pacman agents (in searchAgents.py).
"""

import util


class SearchProblem:
    """
    This class outlines the structure of a search problem, but doesn't implement
    any of the methods (in object-oriented terminology: an abstract class).

    You do not need to change anything in this class, ever.
    """

    def getStartState(self):
        """
        Returns the start state for the search problem.
        """
        util.raiseNotDefined()

    def isGoalState(self, state):
        """
          state: Search state

        Returns True if and only if the state is a valid goal state.
        """
        util.raiseNotDefined()

    def getSuccessors(self, state):
        """
          state: Search state

        For a given state, this should return a list of triples, (successor,
        action, stepCost), where 'successor' is a successor to the current
        state, 'action' is the action required to get there, and 'stepCost' is
        the incremental cost of expanding to that successor.
        """
        util.raiseNotDefined()

    def getCostOfActions(self, actions):
        """
         actions: A list of actions to take

        This method returns the total cost of a particular sequence of actions.
        The sequence must be composed of legal moves.
        """
        util.raiseNotDefined()


def tinyMazeSearch(problem):
    """
    Returns a sequence of moves that solves tinyMaze.  For any other maze, the
    sequence of moves will be incorrect, so only use this for tinyMaze.
    """
    from game import Directions
    s = Directions.SOUTH
    w = Directions.WEST
    return [s, s, w, s, w, w, s, w]


# def depthFirstSearch(problem: SearchProblem):
#     """
#     Search the deepest nodes in the search tree first.
#
#     Your search algorithm needs to return a list of actions that reaches the
#     goal. Make sure to implement a graph search algorithm.
#
#     To get started, you might want to try some of these simple commands to
#     understand the search problem that is being passed in:
#
#     print("Start:", problem.getStartState())
#     print("Is the start a goal?", problem.isGoalState(problem.getStartState()))
#     print("Start's successors:", problem.getSuccessors(problem.getStartState()))
#     """
#     "*** YOUR CODE HERE ***"
#     # util.raiseNotDefined()
#
#     from util import Stack
#
#     frontier = Stack()
#     vizited = []
#
#     frontier.push((problem.getStartState(), []))
#
#     # print("Start:", problem.getStartState())
#
#     while not frontier.isEmpty():
#         state, actions = frontier.pop()
#         vizited.append(state)
#
#         # print("Curent state:", state)
#         # print("Curent action:", problem.getSuccessors(state))
#
#         if problem.isGoalState(state):
#             # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
#             # print("Actiuni: ", actions)
#             return actions
#
#         for successor, nextAction, cost in problem.getSuccessors(state):
#             if successor not in vizited:
#                 frontier.push((successor, actions + [nextAction]))
#
#     # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
#     return []

def depthFirstSearch(problem: SearchProblem):
    """
    Search the deepest nodes in the search tree first.

    Your search algorithm needs to return a list of actions that reaches the
    goal. Make sure to implement a graph search algorithm.

    To get started, you might want to try some of these simple commands to
    understand the search problem that is being passed in:

    print("Start:", problem.getStartState())
    print("Is the start a goal?", problem.isGoalState(problem.getStartState()))
    print("Start's successors:", problem.getSuccessors(problem.getStartState()))
    """
    "*** YOUR CODE HERE ***"
    # util.raiseNotDefined()

    from util import Stack

    frontier = Stack()
    vizited = []

    frontier.push((problem.getStartState(), []))

    # print("Start:", problem.getStartState())

    while not frontier.isEmpty():
        state, actions = frontier.pop()

        # print("Curent state:", state)
        # print("Curent action:", problem.getSuccessors(state))
        if state in vizited:
            continue

        if problem.isGoalState(state):
            # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
            # print("Actiuni: ", actions)
            return actions

        for successor, nextAction, cost in problem.getSuccessors(state):
            if successor not in vizited:
                frontier.push((successor, actions + [nextAction]))
                vizited.append(state)

    # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
    return []

def breadthFirstSearch(problem: SearchProblem):
    """Search the shallowest nodes in the search tree first."""
    "*** YOUR CODE HERE ***"
    # util.raiseNotDefined()
    from util import Queue

    frontier = Queue()
    vizited = []

    frontier.push((problem.getStartState(), []))
    vizited.append(problem.getStartState())

    # print("Start:", problem.getStartState())

    while not frontier.isEmpty():
        state, actions = frontier.pop()

        # print("Curent state:", state)
        # print("Curent action:", problem.getSuccessors(state))

        if problem.isGoalState(state):
            # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
            # print("Actiuni: ", actions)
            return actions

        for successor, nextAction, cost in problem.getSuccessors(state):
            if successor not in vizited:
                frontier.push((successor, actions + [nextAction]))
                vizited.append(successor)

    # print("Start's successors:", problem.getSuccessors(problem.getStartState()))
    return []

def uniformCostSearch(problem: SearchProblem):
    """Search the node of least total cost first."""
    "*** YOUR CODE HERE ***"
    # util.raiseNotDefined()

    from util import PriorityQueue

    frontier = PriorityQueue()
    vizited = {}

    frontier.push((problem.getStartState(), []), 0)
    vizited[problem.getStartState()] = 0

    while not frontier.isEmpty():
        state, actions = frontier.pop()

        if problem.isGoalState(state):
            return actions

        for successor, nextAction, cost in problem.getSuccessors(state):
            new_action = actions + [nextAction]
            new_cost = problem.getCostOfActions(new_action)

            if successor not in vizited or new_cost < vizited[successor]:
                vizited[successor] = new_cost
                frontier.push((successor, new_action), new_cost)

    return []


def nullHeuristic(state, problem=None):
    """
    A heuristic function estimates the cost from the current state to the nearest
    goal in the provided SearchProblem.  This heuristic is trivial.
    """
    return 0


def aStarSearch(problem: SearchProblem, heuristic=nullHeuristic):
    """Search the node that has the lowest combined cost and heuristic first."""
    "*** YOUR CODE HERE ***"
    # util.raiseNotDefined()

    from util import PriorityQueue

    frontier = PriorityQueue()
    vizited = {}

    frontier.push((problem.getStartState(), []), 0)
    # print(searchAgents.manhattanHeuristic(problem.getStartState(), problem, heuristic))
    vizited[problem.getStartState()] = 0

    while not frontier.isEmpty():
        state, actions = frontier.pop()

        if problem.isGoalState(state):
            return actions

        for successor, nextAction, cost in problem.getSuccessors(state):
            new_action = actions + [nextAction]
            new_cost = problem.getCostOfActions(new_action) + heuristic(successor, problem)

            if successor not in vizited or new_cost < vizited[successor]:
                vizited[successor] = new_cost
                frontier.push((successor, new_action), new_cost)

    return []

# Abbreviations
bfs = breadthFirstSearch
dfs = depthFirstSearch
astar = aStarSearch
ucs = uniformCostSearch
