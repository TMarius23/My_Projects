module ExampleTests.CursorTests exposing (..)

import Cursor exposing (..)
import Expect
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "module Cursor"
        [ describe "back"
            [ Test.test "#back: \n\n    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen back\n    --> Just (withSelectedElement [] 1 [2, 3])" <|
                \() ->
                    Expect.equal
                        (nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen back)
                        (Just (withSelectedElement [] 1 [ 2, 3 ]))
            , Test.test "#back: \n\n    back (nonEmpty 1 [])\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (back (nonEmpty 1 []))
                        Nothing
            , Test.test "#back: \n\n    back (nonEmpty 1 [ 2, 3 ])\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (back (nonEmpty 1 [ 2, 3 ]))
                        Nothing
            ]
        , describe "forward"
            [ Test.test "#forward: \n\n    nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen forward\n    --> Just (withSelectedElement [1, 2] 3 [])" <|
                \() ->
                    Expect.equal
                        (nonEmpty 1 [ 2, 3 ] |> forward |> Maybe.andThen forward)
                        (Just (withSelectedElement [ 1, 2 ] 3 []))
            , Test.test "#forward: \n\n    forward (nonEmpty 1 [])\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (forward (nonEmpty 1 []))
                        Nothing
            , Test.test "#forward: \n\n    forward (nonEmpty 1 [ 2, 3 ])\n    --> Just (withSelectedElement [1] 2 [3])" <|
                \() ->
                    Expect.equal
                        (forward (nonEmpty 1 [ 2, 3 ]))
                        (Just (withSelectedElement [ 1 ] 2 [ 3 ]))
            ]
        , describe "fromList"
            [ Test.test "#fromList: \n\n    fromList []\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (fromList [])
                        Nothing
            , Test.test "#fromList: \n\n    fromList [ 1, 2, 3 ]\n    --> Just (withSelectedElement [] 1 [2, 3])" <|
                \() ->
                    Expect.equal
                        (fromList [ 1, 2, 3 ])
                        (Just (withSelectedElement [] 1 [ 2, 3 ]))
            ]
        , describe "length"
            [ Test.test "#length: \n\n    length (nonEmpty 1 [ 2, 3 ])\n    --> 3" <|
                \() ->
                    Expect.equal
                        (length (nonEmpty 1 [ 2, 3 ]))
                        3
            , Test.test "#length: \n\n    length (nonEmpty 1 [])\n    --> 1" <|
                \() ->
                    Expect.equal
                        (length (nonEmpty 1 []))
                        1
            ]
        , describe "toList"
            [ Test.test "#toList: \n\n    toList (nonEmpty 1 [ 2, 3 ])\n    --> [1, 2, 3]" <|
                \() ->
                    Expect.equal
                        (toList (nonEmpty 1 [ 2, 3 ]))
                        [ 1, 2, 3 ]
            ]
        ]
