# Guns and Butter

Guns and Butter is a library for managing an economy of goods within system memory.

### Installation:
```
npm i guns-butter
```

### Getting Started:

If code is of type: "module":
```
import { Econ } from "guns-butter";

var econ = new Econ();
```

Else you can simply require it:
```
const gb = require("guns-butter");

var econ = new gb.Econ();
```

More detailed examples programs can be found within the ts/examples directory

### Intended use:

I designed this software to be used server-side (although it does work client-side) for managing and simulating an economy. The intention is that a developer can create an API so users can engage with the economy through their own account. For example: "Jimmy" is selling apples for 6 dollars and "Abby" is buying apples for 5.5 dollars. They would submit a sell order and a buy order respectively to the economy. Another user "Sam" wants to buy apples for 6 dollars so they submit a buy order for 6 dollars. The exchange will see that there is a buy order which is equal to or greater than a sell order, so Jimmy's sell order gets executed with Sam's buy order, both are removed from the exchange, and a reciept is sent to the server for record keeping and account management. 

### software direction:

I plan on adding more features to the library such as more types of orders (limit orders, market orders and so forth) so that the economy can have a wider use case. Also adding extended features such as user management and in the future, database integration so that data is not stored in system memory.
