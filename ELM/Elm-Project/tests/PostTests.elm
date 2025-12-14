module PostTests exposing (..)

import Expect
import Fuzz
import Json.Decode as De
import Json.Encode as Enc
import Model.Post as Post
import Test exposing (..)


requiredFields : List ( String, Enc.Value )
requiredFields =
    [ ( "by", Enc.string "Tepix" )
    , ( "id", Enc.int 38141366 )
    , ( "score", Enc.int 557 )
    , ( "time", Enc.int 1699108556 )
    , ( "title", Enc.string "Othello Is Solved?" )
    , ( "type", Enc.string "story" )
    ]


fields : List ( String, Enc.Value )
fields =
    ( "url", Enc.string "https://arxiv.org/abs/2310.19387" ) :: requiredFields


fieldNames : List String
fieldNames =
    List.map Tuple.first requiredFields


completePost : Enc.Value
completePost =
    Enc.object fields


postWithMissingField : String -> Enc.Value
postWithMissingField fieldToDrop =
    fields
        |> List.filter (\( fieldName, _ ) -> fieldToDrop /= fieldName)
        |> Enc.object


suite : Test
suite =
    describe "module Post"
        [ describe
            "Post.decode"
            [ test "decode parses post correctly" <|
                \_ ->
                    completePost
                        |> Enc.encode 0
                        |> De.decodeString Post.decode
                        |> Expect.ok
            , fuzz (Fuzz.oneOfValues fieldNames) "decode fails if a field is missing" <|
                \fieldToDrop ->
                    postWithMissingField fieldToDrop
                        |> Enc.encode 0
                        |> De.decodeString Post.decode
                        |> Expect.err
            ]
        ]
