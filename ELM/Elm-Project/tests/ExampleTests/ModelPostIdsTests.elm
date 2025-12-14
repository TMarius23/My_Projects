module ExampleTests.ModelPostIdsTests exposing (..)

import Cursor
import Expect
import Json.Decode as De
import Model.PostIds exposing (..)
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "module Model.PostIds"
        [ describe "advance"
            [ Test.test "#advance: \n\n    advance (PostIds (Cursor.withSelectedElement [ 1, 2 ] 3 []))\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (advance (PostIds (Cursor.withSelectedElement [ 1, 2 ] 3 [])))
                        Nothing
            , Test.test "#advance: \n\n    advance (PostIds (Cursor.nonEmpty 1 [ 2, 3 ]))\n    --> Just ( 2, PostIds (Cursor.withSelectedElement [1] 2 [3]))" <|
                \() ->
                    Expect.equal
                        (advance (PostIds (Cursor.nonEmpty 1 [ 2, 3 ])))
                        (Just ( 2, PostIds (Cursor.withSelectedElement [ 1 ] 2 [ 3 ]) ))
            ]
        , describe "decode"
            [ Test.test "#decode: \n\n    De.decodeString decode \"[]\"\n    --> Ok (Nothing)" <|
                \() ->
                    Expect.equal
                        (De.decodeString decode "[]")
                        (Ok Nothing)
            , Test.test "#decode: \n\n    De.decodeString decode \"[1]\"\n    --> Ok (Just (PostIds (Cursor.nonEmpty 1 [])))" <|
                \() ->
                    Expect.equal
                        (De.decodeString decode "[1]")
                        (Ok (Just (PostIds (Cursor.nonEmpty 1 []))))
            , Test.test "#decode: \n\n    De.decodeString decode \"[1, 2, 3]\"\n    --> Ok (Just (PostIds (Cursor.nonEmpty 1 [2, 3])))" <|
                \() ->
                    Expect.equal
                        (De.decodeString decode "[1, 2, 3]")
                        (Ok (Just (PostIds (Cursor.nonEmpty 1 [ 2, 3 ]))))
            ]
        ]
