module Model.PostIds exposing (..)

import Cursor exposing (Cursor)
import Json.Decode as De


type HackerNewsItem
    = Top
    | New
    | Show
    | Ask
    | Jobs


itemName : HackerNewsItem -> String
itemName item =
    case item of
        Top ->
            "top"

        New ->
            "new"

        Show ->
            "show"

        Ask ->
            "ask"

        Jobs ->
            "job"


type PostIds
    = PostIds (Cursor Int)


{-| Returns the first post id

    import Cursor

    first (PostIds (Cursor.nonEmpty 1 [ 2, 3 ])) {- ignore -} --> 1

-}
first : PostIds -> Int
first (PostIds ids) =
    Cursor.current ids


{-| Moves the `Cursor` forward and returns the current post id

If the `Cursor` is focused on the last element, it returns `Nothing`

    import Cursor

    advance (PostIds (Cursor.nonEmpty 1 [ 2, 3 ])) --> Just ( 2, PostIds (Cursor.withSelectedElement [1] 2 [3]))

    advance (PostIds (Cursor.withSelectedElement [ 1, 2 ] 3 [])) --> Nothing

-}
advance : PostIds -> Maybe ( Int, PostIds )
advance (PostIds post) =
    -- Nothing
    -- Debug.todo "advance"
    case Cursor.forward post of
        Just val -> Just (Cursor.current val, PostIds val)
        Nothing -> Nothing


{-| Returns the first post id

    import Cursor

    first (PostIds (Cursor.nonEmpty 1 [ 2, 3 ])) {- ignore -} --> 1

-}
fromList : List Int -> Maybe PostIds
fromList ids =
    Cursor.fromList ids
        |> Maybe.map PostIds


{-| Decode a list of post ids.

If the list is empty, the function returns `Nothing`.

    import Json.Decode as De
    import Cursor

    De.decodeString decode "[1, 2, 3]" --> Ok (Just (PostIds (Cursor.nonEmpty 1 [2, 3])))

    De.decodeString decode "[1]" --> Ok (Just (PostIds (Cursor.nonEmpty 1 [])))

    De.decodeString decode "[]" --> Ok (Nothing)

-}
decode : De.Decoder (Maybe PostIds)
decode =
    -- De.fail "TODO"
    -- Debug.todo "PostIds.decode"
    De.list De.int 
        |> De.map
            (\rez -> 
                case rez of
                    [] -> Nothing
                    _ -> fromList rez
            )
