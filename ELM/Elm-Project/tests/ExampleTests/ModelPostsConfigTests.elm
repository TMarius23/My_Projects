module ExampleTests.ModelPostsConfigTests exposing (..)

import Expect
import Model.PostsConfig exposing (..)
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "module Model.PostsConfig"
        [ describe "sortFromString"
            [ Test.test "#sortFromString: \n\n    sortFromString \"Title\"\n    --> Just Title" <|
                \() ->
                    Expect.equal
                        (sortFromString "Title")
                        (Just Title)
            , Test.test "#sortFromString: \n\n    sortFromString \"Invalid\"\n    --> Nothing" <|
                \() ->
                    Expect.equal
                        (sortFromString "Invalid")
                        Nothing
            , Test.test "#sortFromString: \n\n    sortFromString \"Score\"\n    --> Just Score" <|
                \() ->
                    Expect.equal
                        (sortFromString "Score")
                        (Just Score)
            ]
        ]
