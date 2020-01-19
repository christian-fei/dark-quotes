// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var $$String = require("bs-platform/lib/js/string.js");
var Tea_app = require("bucklescript-tea/src-ocaml/tea_app.js");
var Tea_cmd = require("bucklescript-tea/src-ocaml/tea_cmd.js");
var Tea_sub = require("bucklescript-tea/src-ocaml/tea_sub.js");
var Tea_html = require("bucklescript-tea/src-ocaml/tea_html.js");
var Tea_http = require("bucklescript-tea/src-ocaml/tea_http.js");
var Tea_json = require("bucklescript-tea/src-ocaml/tea_json.js");

var host = "https://kberridge-test.builtwithdark.com";

var getQuoteUrl = $$String.concat("", /* :: */[
      host,
      /* :: */[
        "/quote",
        /* [] */0
      ]
    ]);

function getDifferentQuoteUrl(quote) {
  if (quote !== undefined) {
    return $$String.concat("", /* :: */[
                host,
                /* :: */[
                  "/quote",
                  /* :: */[
                    "?not=",
                    /* :: */[
                      quote[/* key */2],
                      /* [] */0
                    ]
                  ]
                ]
              ]);
  } else {
    return getQuoteUrl;
  }
}

function gotQuoteResponse(param_0) {
  return /* GotQuoteResponse */Block.__(0, [param_0]);
}

function setQuote(param_0) {
  return /* SetQuote */Block.__(1, [param_0]);
}

function setAttribution(param_0) {
  return /* SetAttribution */Block.__(2, [param_0]);
}

function gotPostQuoteResponse(param_0) {
  return /* GotPostQuoteResponse */Block.__(3, [param_0]);
}

function apiPostQuote(addQuote) {
  var body = Tea_json.Encoder[/* encode */0](0, Tea_json.Encoder[/* object_ */6](/* :: */[
            /* tuple */[
              "quote",
              Tea_json.Encoder[/* string */1](addQuote[/* quote */0])
            ],
            /* :: */[
              /* tuple */[
                "attribution",
                Tea_json.Encoder[/* string */1](addQuote[/* attribution */1])
              ],
              /* [] */0
            ]
          ]));
  return Tea_http.send(gotPostQuoteResponse, Tea_http.request(/* record */[
                  /* method' */"POST",
                  /* headers : [] */0,
                  /* url */$$String.concat("", /* :: */[
                        host,
                        /* :: */[
                          "/quote",
                          /* [] */0
                        ]
                      ]),
                  /* body : StringBody */Block.__(0, [body]),
                  /* expect */Tea_http.expectString,
                  /* timeout */undefined,
                  /* withCredentials */false
                ]));
}

function init(param) {
  return /* tuple */[
          /* record */[
            /* currentQuote */undefined,
            /* failed */false,
            /* addQuote : record */[
              /* quote */"",
              /* attribution */""
            ],
            /* addFailed */false,
            /* addQuotePending */false,
            /* addQuoteErrors : [] */0
          ],
          Tea_http.send(gotQuoteResponse, Tea_http.getString(getQuoteUrl))
        ];
}

var quote_decoder = Tea_json.Decoder[/* map3 */18]((function (x, y, z) {
        return /* record */[
                /* quote */y,
                /* attribution */z,
                /* key */x
              ];
      }), Tea_json.Decoder[/* field */11]("key", Tea_json.Decoder[/* string */2]), Tea_json.Decoder[/* field */11]("quote", Tea_json.Decoder[/* string */2]), Tea_json.Decoder[/* maybe */14](Tea_json.Decoder[/* field */11]("attribution", Tea_json.Decoder[/* string */2])));

var error_decoder = Tea_json.Decoder[/* map2 */17]((function (x, y) {
        return /* record */[
                /* errorKey */x,
                /* message */y
              ];
      }), Tea_json.Decoder[/* field */11]("errorKey", Tea_json.Decoder[/* string */2]), Tea_json.Decoder[/* field */11]("message", Tea_json.Decoder[/* string */2]));

var errors_decoder = Tea_json.Decoder[/* list */7](error_decoder);

function updateCurrentQuoteFromJson(model, data) {
  var match = Tea_json.Decoder[/* decodeString */32](quote_decoder, data);
  if (match.tag) {
    return /* record */[
            /* currentQuote */undefined,
            /* failed */true,
            /* addQuote */model[/* addQuote */2],
            /* addFailed */model[/* addFailed */3],
            /* addQuotePending */model[/* addQuotePending */4],
            /* addQuoteErrors */model[/* addQuoteErrors */5]
          ];
  } else {
    return /* record */[
            /* currentQuote */match[0],
            /* failed */false,
            /* addQuote */model[/* addQuote */2],
            /* addFailed */model[/* addFailed */3],
            /* addQuotePending */model[/* addQuotePending */4],
            /* addQuoteErrors */model[/* addQuoteErrors */5]
          ];
  }
}

function update(model, param) {
  if (typeof param === "number") {
    if (param === 0) {
      return /* tuple */[
              model,
              Tea_http.send(gotQuoteResponse, Tea_http.getString(getDifferentQuoteUrl(model[/* currentQuote */0])))
            ];
    } else {
      return /* tuple */[
              /* record */[
                /* currentQuote */model[/* currentQuote */0],
                /* failed */model[/* failed */1],
                /* addQuote */model[/* addQuote */2],
                /* addFailed */model[/* addFailed */3],
                /* addQuotePending */true,
                /* addQuoteErrors */model[/* addQuoteErrors */5]
              ],
              apiPostQuote(model[/* addQuote */2])
            ];
    }
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var match = param[0];
          if (match.tag) {
            return /* tuple */[
                    /* record */[
                      /* currentQuote */undefined,
                      /* failed */true,
                      /* addQuote */model[/* addQuote */2],
                      /* addFailed */model[/* addFailed */3],
                      /* addQuotePending */model[/* addQuotePending */4],
                      /* addQuoteErrors */model[/* addQuoteErrors */5]
                    ],
                    Tea_cmd.none
                  ];
          } else {
            return /* tuple */[
                    updateCurrentQuoteFromJson(model, match[0]),
                    Tea_cmd.none
                  ];
          }
      case 1 : 
          var init = model[/* addQuote */2];
          return /* tuple */[
                  /* record */[
                    /* currentQuote */model[/* currentQuote */0],
                    /* failed */model[/* failed */1],
                    /* addQuote : record */[
                      /* quote */param[0],
                      /* attribution */init[/* attribution */1]
                    ],
                    /* addFailed */model[/* addFailed */3],
                    /* addQuotePending */model[/* addQuotePending */4],
                    /* addQuoteErrors */model[/* addQuoteErrors */5]
                  ],
                  Tea_cmd.none
                ];
      case 2 : 
          var init$1 = model[/* addQuote */2];
          return /* tuple */[
                  /* record */[
                    /* currentQuote */model[/* currentQuote */0],
                    /* failed */model[/* failed */1],
                    /* addQuote : record */[
                      /* quote */init$1[/* quote */0],
                      /* attribution */param[0]
                    ],
                    /* addFailed */model[/* addFailed */3],
                    /* addQuotePending */model[/* addQuotePending */4],
                    /* addQuoteErrors */model[/* addQuoteErrors */5]
                  ],
                  Tea_cmd.none
                ];
      case 3 : 
          var match$1 = param[0];
          if (match$1.tag) {
            return /* tuple */[
                    /* record */[
                      /* currentQuote */model[/* currentQuote */0],
                      /* failed */model[/* failed */1],
                      /* addQuote */model[/* addQuote */2],
                      /* addFailed */true,
                      /* addQuotePending */false,
                      /* addQuoteErrors */model[/* addQuoteErrors */5]
                    ],
                    Tea_cmd.none
                  ];
          } else {
            var response_decoder = Tea_json.Decoder[/* map3 */18]((function (a, b, c) {
                    return /* record */[
                            /* success */a,
                            /* quote */b,
                            /* errors */c
                          ];
                  }), Tea_json.Decoder[/* field */11]("success", Tea_json.Decoder[/* bool */5]), Tea_json.Decoder[/* maybe */14](Tea_json.Decoder[/* field */11]("quote", quote_decoder)), Tea_json.Decoder[/* maybe */14](Tea_json.Decoder[/* field */11]("errors", errors_decoder)));
            var responseResult = Tea_json.Decoder[/* decodeString */32](response_decoder, match$1[0]);
            if (responseResult.tag) {
              return /* tuple */[
                      /* record */[
                        /* currentQuote */model[/* currentQuote */0],
                        /* failed */true,
                        /* addQuote */model[/* addQuote */2],
                        /* addFailed */model[/* addFailed */3],
                        /* addQuotePending */false,
                        /* addQuoteErrors */model[/* addQuoteErrors */5]
                      ],
                      Tea_cmd.none
                    ];
            } else {
              var response = responseResult[0];
              if (response[/* success */0]) {
                var match$2 = response[/* quote */1];
                if (match$2 !== undefined) {
                  return /* tuple */[
                          /* record */[
                            /* currentQuote */match$2,
                            /* failed */false,
                            /* addQuote : record */[
                              /* quote */"",
                              /* attribution */""
                            ],
                            /* addFailed */model[/* addFailed */3],
                            /* addQuotePending */false,
                            /* addQuoteErrors : [] */0
                          ],
                          Tea_cmd.none
                        ];
                } else {
                  return /* tuple */[
                          /* record */[
                            /* currentQuote */model[/* currentQuote */0],
                            /* failed */true,
                            /* addQuote */model[/* addQuote */2],
                            /* addFailed */model[/* addFailed */3],
                            /* addQuotePending */false,
                            /* addQuoteErrors */model[/* addQuoteErrors */5]
                          ],
                          Tea_cmd.none
                        ];
                }
              } else {
                var match$3 = response[/* errors */2];
                if (match$3 !== undefined) {
                  return /* tuple */[
                          /* record */[
                            /* currentQuote */model[/* currentQuote */0],
                            /* failed */model[/* failed */1],
                            /* addQuote */model[/* addQuote */2],
                            /* addFailed */model[/* addFailed */3],
                            /* addQuotePending */false,
                            /* addQuoteErrors */match$3
                          ],
                          Tea_cmd.none
                        ];
                } else {
                  return /* tuple */[
                          /* record */[
                            /* currentQuote */model[/* currentQuote */0],
                            /* failed */true,
                            /* addQuote */model[/* addQuote */2],
                            /* addFailed */model[/* addFailed */3],
                            /* addQuotePending */false,
                            /* addQuoteErrors */model[/* addQuoteErrors */5]
                          ],
                          Tea_cmd.none
                        ];
                }
              }
            }
          }
      
    }
  }
}

function viewQuote(quote) {
  var match = quote[/* attribution */1];
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
                    Tea_html.text(quote[/* quote */0]),
                    /* [] */0
                  ]),
              /* :: */[
                match !== undefined ? Tea_html.div(undefined, undefined, /* :: */[
                        Tea_html.style("padding-left", "2em"),
                        /* [] */0
                      ], /* :: */[
                        Tea_html.text($$String.concat("", /* :: */[
                                  "-",
                                  /* :: */[
                                    match,
                                    /* [] */0
                                  ]
                                ])),
                        /* [] */0
                      ]) : Tea_html.noNode,
                /* [] */0
              ]
            ]);
}

function viewErrorDisplayList(errors) {
  return Tea_html.div(undefined, undefined, /* :: */[
              Tea_html.style("border", "1px solid red"),
              /* :: */[
                Tea_html.style("padding", "1em"),
                /* [] */0
              ]
            ], /* :: */[
              Tea_html.ul(undefined, undefined, /* :: */[
                    Tea_html.style("padding", "0 0 0 1em"),
                    /* :: */[
                      Tea_html.style("margin", "0"),
                      /* [] */0
                    ]
                  ], List.map((function (e) {
                          return Tea_html.li(undefined, undefined, /* :: */[
                                      Tea_html.style("color", "red "),
                                      /* [] */0
                                    ], /* :: */[
                                      Tea_html.text(e[/* message */1]),
                                      /* [] */0
                                    ]);
                        }), errors)),
              /* [] */0
            ]);
}

function viewNewQuoteForm(model) {
  return Tea_html.div(undefined, undefined, /* :: */[
              Tea_html.style("display", "flex"),
              /* :: */[
                Tea_html.style("justify-content", "center"),
                /* [] */0
              ]
            ], /* :: */[
              Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
                    Tea_html.h2(undefined, undefined, /* :: */[
                          Tea_html.style("margin", "4em 0 0 0"),
                          /* [] */0
                        ], /* :: */[
                          Tea_html.text("Add a new quote"),
                          /* [] */0
                        ]),
                    /* :: */[
                      Tea_html.div(undefined, undefined, /* :: */[
                            Tea_html.style("border", "1px solid black"),
                            /* :: */[
                              Tea_html.style("padding", "1em"),
                              /* :: */[
                                Tea_html.style("width", "20em"),
                                /* [] */0
                              ]
                            ]
                          ], /* :: */[
                            List.length(model[/* addQuoteErrors */5]) > 0 ? viewErrorDisplayList(model[/* addQuoteErrors */5]) : Tea_html.noNode,
                            /* :: */[
                              Tea_html.label(undefined, undefined, /* :: */[
                                    Tea_html.for$prime("quote"),
                                    /* :: */[
                                      Tea_html.style("display", "block"),
                                      /* [] */0
                                    ]
                                  ], /* :: */[
                                    Tea_html.text("Quote"),
                                    /* [] */0
                                  ]),
                              /* :: */[
                                Tea_html.textarea(undefined, undefined, /* :: */[
                                      Tea_html.name("quote"),
                                      /* :: */[
                                        Tea_html.style("width", "100%"),
                                        /* :: */[
                                          Tea_html.onChange(undefined, setQuote),
                                          /* :: */[
                                            Tea_html.value(model[/* addQuote */2][/* quote */0]),
                                            /* [] */0
                                          ]
                                        ]
                                      ]
                                    ], /* [] */0),
                                /* :: */[
                                  Tea_html.label(undefined, undefined, /* :: */[
                                        Tea_html.for$prime("attribution"),
                                        /* :: */[
                                          Tea_html.style("display", "block"),
                                          /* [] */0
                                        ]
                                      ], /* :: */[
                                        Tea_html.text("Attribution"),
                                        /* [] */0
                                      ]),
                                  /* :: */[
                                    Tea_html.input$prime(undefined, undefined, /* :: */[
                                          Tea_html.name("attribution"),
                                          /* :: */[
                                            Tea_html.style("width", "100%"),
                                            /* :: */[
                                              Tea_html.onChange(undefined, setAttribution),
                                              /* :: */[
                                                Tea_html.value(model[/* addQuote */2][/* attribution */1]),
                                                /* [] */0
                                              ]
                                            ]
                                          ]
                                        ], /* [] */0),
                                    /* :: */[
                                      Tea_html.button(undefined, undefined, /* :: */[
                                            Tea_html.onClick(/* PostQuote */1),
                                            /* :: */[
                                              Tea_html.style("margin-top", "1em"),
                                              /* :: */[
                                                Tea_html.Attributes[/* disabled */3](model[/* addQuotePending */4]),
                                                /* [] */0
                                              ]
                                            ]
                                          ], /* :: */[
                                            Tea_html.text("Add Quote"),
                                            /* [] */0
                                          ]),
                                      /* [] */0
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]),
                      /* [] */0
                    ]
                  ]),
              /* [] */0
            ]);
}

function view(model) {
  var match = model[/* failed */1];
  var tmp;
  if (match) {
    tmp = /* :: */[
      Tea_html.div(undefined, undefined, /* :: */[
            Tea_html.style("color", "red"),
            /* [] */0
          ], /* :: */[
            Tea_html.text("Something has gone terribly, terribly wrong!"),
            /* [] */0
          ]),
      /* [] */0
    ];
  } else {
    var match$1 = model[/* currentQuote */0];
    tmp = match$1 !== undefined ? /* :: */[
        viewQuote(match$1),
        /* [] */0
      ] : /* :: */[
        Tea_html.text("fetching quote, hold on a sec..."),
        /* [] */0
      ];
  }
  var match$2 = model[/* currentQuote */0];
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              Tea_html.header(undefined, undefined, /* :: */[
                    Tea_html.style("text-align", "center"),
                    /* [] */0
                  ], /* :: */[
                    Tea_html.h1(undefined, undefined, /* [] */0, /* :: */[
                          Tea_html.text("Quotes, from Dark Lang!"),
                          /* [] */0
                        ]),
                    /* [] */0
                  ]),
              /* :: */[
                Tea_html.div(undefined, undefined, /* :: */[
                      Tea_html.style("display", "flex"),
                      /* :: */[
                        Tea_html.style("justify-content", "center"),
                        /* [] */0
                      ]
                    ], tmp),
                /* :: */[
                  match$2 !== undefined ? Tea_html.div(undefined, undefined, /* :: */[
                          Tea_html.style("display", "flex"),
                          /* :: */[
                            Tea_html.style("justify-content", "center"),
                            /* :: */[
                              Tea_html.style("padding-top", "2em"),
                              /* [] */0
                            ]
                          ]
                        ], /* :: */[
                          Tea_html.button(undefined, undefined, /* :: */[
                                Tea_html.onClick(/* GetDifferentQuote */0),
                                /* [] */0
                              ], /* :: */[
                                Tea_html.text("Get a different quote"),
                                /* [] */0
                              ]),
                          /* [] */0
                        ]) : Tea_html.noNode,
                  /* :: */[
                    viewNewQuoteForm(model),
                    /* :: */[
                      Tea_html.div(undefined, undefined, /* :: */[
                            Tea_html.style("display", "flex"),
                            /* :: */[
                              Tea_html.style("justify-content", "center"),
                              /* :: */[
                                Tea_html.style("padding-top", "2em"),
                                /* [] */0
                              ]
                            ]
                          ], /* :: */[
                            Tea_html.p(undefined, undefined, /* [] */0, /* :: */[
                                  Tea_html.text("Built by "),
                                  /* :: */[
                                    Tea_html.a(undefined, undefined, /* :: */[
                                          Tea_html.href("https://www.kevinberridge.com"),
                                          /* :: */[
                                            Tea_html.target("_blank"),
                                            /* [] */0
                                          ]
                                        ], /* :: */[
                                          Tea_html.text("Kevin Berridge"),
                                          /* [] */0
                                        ]),
                                    /* :: */[
                                      Tea_html.text(" "),
                                      /* :: */[
                                        Tea_html.a(undefined, undefined, /* :: */[
                                              Tea_html.href("http://twitter.com/kberridge"),
                                              /* :: */[
                                                Tea_html.target("_blank"),
                                                /* [] */0
                                              ]
                                            ], /* :: */[
                                              Tea_html.text("(@kberridge)"),
                                              /* [] */0
                                            ]),
                                        /* :: */[
                                          Tea_html.text(" in "),
                                          /* :: */[
                                            Tea_html.a(undefined, undefined, /* :: */[
                                                  Tea_html.href("http://darklang.com"),
                                                  /* :: */[
                                                    Tea_html.target("_blank"),
                                                    /* [] */0
                                                  ]
                                                ], /* :: */[
                                                  Tea_html.text("Dark"),
                                                  /* [] */0
                                                ]),
                                            /* :: */[
                                              Tea_html.text(" and "),
                                              /* :: */[
                                                Tea_html.a(undefined, undefined, /* :: */[
                                                      Tea_html.href("https://bucklescript.github.io/docs/en/stdlib-overview"),
                                                      /* :: */[
                                                        Tea_html.target("_blank"),
                                                        /* [] */0
                                                      ]
                                                    ], /* :: */[
                                                      Tea_html.text("BuckleScript"),
                                                      /* [] */0
                                                    ]),
                                                /* :: */[
                                                  Tea_html.text(" and "),
                                                  /* :: */[
                                                    Tea_html.a(undefined, undefined, /* :: */[
                                                          Tea_html.href("https://github.com/OvermindDL1/bucklescript-tea"),
                                                          /* :: */[
                                                            Tea_html.target("_blank"),
                                                            /* [] */0
                                                          ]
                                                        ], /* :: */[
                                                          Tea_html.text("BuckleScript-TEA"),
                                                          /* [] */0
                                                        ]),
                                                    /* :: */[
                                                      Tea_html.text(" "),
                                                      /* :: */[
                                                        Tea_html.a(undefined, undefined, /* :: */[
                                                              Tea_html.href("https://github.com/kberridge/dark-quotes"),
                                                              /* :: */[
                                                                Tea_html.target("_blank"),
                                                                /* [] */0
                                                              ]
                                                            ], /* :: */[
                                                              Tea_html.text("(github)"),
                                                              /* [] */0
                                                            ]),
                                                        /* [] */0
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ]
                                ]),
                            /* [] */0
                          ]),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]);
}

function partial_arg_003(param) {
  return Tea_sub.none;
}

var partial_arg = /* record */[
  /* init */init,
  /* update */update,
  /* view */view,
  partial_arg_003
];

function main(param, param$1) {
  return Tea_app.standardProgram(partial_arg, param, param$1);
}

var getDifferentQuote = /* GetDifferentQuote */0;

var postQuote = /* PostQuote */1;

exports.host = host;
exports.getQuoteUrl = getQuoteUrl;
exports.getDifferentQuoteUrl = getDifferentQuoteUrl;
exports.gotQuoteResponse = gotQuoteResponse;
exports.getDifferentQuote = getDifferentQuote;
exports.setQuote = setQuote;
exports.setAttribution = setAttribution;
exports.postQuote = postQuote;
exports.gotPostQuoteResponse = gotPostQuoteResponse;
exports.apiPostQuote = apiPostQuote;
exports.init = init;
exports.quote_decoder = quote_decoder;
exports.errors_decoder = errors_decoder;
exports.updateCurrentQuoteFromJson = updateCurrentQuoteFromJson;
exports.update = update;
exports.viewQuote = viewQuote;
exports.viewErrorDisplayList = viewErrorDisplayList;
exports.viewNewQuoteForm = viewNewQuoteForm;
exports.view = view;
exports.main = main;
/* getQuoteUrl Not a pure module */
