module Cursor exposing (Cursor, back, current, forward, fromList, length, nonEmpty, toList, withSelectedElement)

{-| Data structure to efficiently navigate a list forward or backward.

It stores a non-empty list as two lists and one element that is currently "selected".

For example, the list `[1, 2, 3]`, when focused on the first element, would be stored as `Cursor [] 1 [2, 3]`.
To focus on the second element, the representation becomes `Cursor [1] 2 [3]`.
Finally, focusing on the third element is: `Cursor [2, 1] 3 []`.

**Note that the left part of the list is stored in reverse order!**

-}


type Cursor a
    = Cursor (List a) a (List a)


withSelectedElement : List a -> a -> List a -> Cursor a
withSelectedElement left mid right =
    Cursor (List.reverse left) mid right


nonEmpty : a -> List a -> Cursor a
nonEmpty x xs =
    Cursor [] x xs


{-| Creates a `Cursor` from a `List`, if the list is not empty

    fromList [ 1, 2, 3 ] --> Just (withSelectedElement [] 1 [2, 3])

    fromList [] --> Nothing

-}
fromList : List a -> Maybe (Cursor a)
fromList l =
    -- Nothing
    -- Debug.todo "fromList"
    case l of
        [] -> Nothing
        x :: xs -> Just (withSelectedElement [] x xs)

{-| Convert the `Cursor` to a `List`

    toList (nonEmpty 1 [ 2, 3 ]) --> [1, 2, 3]

-}
toList : Cursor a -> List a
toList l =
    -- []
    -- Debug.todo "toList"
    let 
        (Cursor l1 x l2) = l
    in  
        l1  ++ (x :: l2)
         


{-| Get the current element from the cursor

    current (nonEmpty 1 [ 2, 3 ]) {- ignore -} --> 1

    current (withSelectedElement [ 1, 2 ] 3 [ 4, 5 ]) {- ignore -} --> 3

-}
current : Cursor a -> a
current (Cursor _ a _) =
    a


{-| Move the cursor forward.

If the cursor would go past the last element, the function should return `Nothing`.

    forward (nonEmpty 1 [ 2, 3 ]) --> Just (withSelectedElement [1] 2 [3])

    forward (nonEmpty 1 []) --> Nothing

    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen forward --> Just (withSelectedElement [1, 2] 3 [])

    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen forward |> Maybe.andThen forward {- hidden -} --> Nothing

-}
forward : Cursor a -> Maybe (Cursor a)
forward l =
    -- Nothing
    -- Debug.todo "forward"
    let 
        (Cursor l1 mij l2) = l
    in 
        case l2 of
            [] -> Nothing
            x :: xs -> Just (withSelectedElement (l1 ++ [mij]) x xs)



{-| Move the cursor backward.

If the cursor would go before the first element, the function should return `Nothing`.

    back (nonEmpty 1 [ 2, 3 ]) --> Nothing

    back (nonEmpty 1 []) --> Nothing

    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen back --> Just (withSelectedElement [] 1 [2, 3])

-}
back : Cursor a -> Maybe (Cursor a)
back l =
    -- Nothing
    -- Debug.todo "back"
    let 
        (Cursor l1 mij l2) = l
    in 
        case l1 of
            [] -> Nothing
            x :: xs -> Just (withSelectedElement (List.reverse xs) x ([mij] ++ l2))



{-| Get the number of elements

    length (nonEmpty 1 []) --> 1

    length (nonEmpty 1 [ 2, 3 ]) --> 3

-}

lengthHelpCalc : Int -> List a -> Int
lengthHelpCalc nrElem l =
    case l of
        [] -> nrElem
        x :: xs -> lengthHelpCalc (nrElem + 1) xs

length : Cursor a -> Int
length l =
    let 
        (Cursor l1 x l2) = l
        lungime  = (lengthHelpCalc 0 l1) + 1 + (lengthHelpCalc 0 l2)
    in
        lungime
    -- Debug.todo "length"
