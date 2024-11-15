'use client'

import { useState } from 'react'
import { FileText, Plus, Eye, LayoutGrid } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { Badge } from "@/components/ui/badge"
import Dashboard from '@/components/@layouts/dashboard-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoanOffers() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [viewMode, setViewMode] = useState('card');

  const [lenderOffers, setLenderOffers] = useState([
    { id: 1, lender: "Lender A", amount: 25000, interestRate: 5.5, term: 12, collateralRequired: "BTC", status: "active" },
    { id: 2, lender: "Lender B", amount: 15000, interestRate: 6.0, term: 6, collateralRequired: "ETH", status: "active" },
    { id: 3, lender: "Lender C", amount: 50000, interestRate: 4.8, term: 24, collateralRequired: "USDC", status: "pending" },
    { id: 4, lender: "Lender D", amount: 10000, interestRate: 7.0, term: 3, collateralRequired: "BTC", status: "active" },
    { id: 5, lender: "Lender E", amount: 30000, interestRate: 5.2, term: 18, collateralRequired: "ETH", status: "active" },
  ])
  const [borrowerOffers, setBorrowerOffers] = useState([
    { id: 1, borrower: "Borrower A", amount: 20000, maxInterestRate: 6.0, term: 12, collateralOffered: "BTC", status: "active" },
    { id: 2, borrower: "Borrower B", amount: 35000, maxInterestRate: 5.5, term: 18, collateralOffered: "ETH", status: "pending" },
    { id: 3, borrower: "Borrower C", amount: 15000, maxInterestRate: 7.0, term: 6, collateralOffered: "USDC", status: "active" },
  ])
  
  const handlePostLenderOffer = async (newOffer) => {
    try {
      const { data } = await axios.post('/api/lender-offers', newOffer);
      setLenderOffers([...lenderOffers, { ...data, id: lenderOffers.length + 1, status: 'pending' }]);
    } catch (error) {
      console.error("Error creating lender offer:", error);
    }
  };
  
  const handlePostBorrowerOffer = async (newOffer) => {
    try {
      const { data } = await axios.post('/api/borrower-offers', newOffer);
      setBorrowerOffers([...borrowerOffers, { ...data, id: borrowerOffers.length + 1, status: 'pending' }]);
    } catch (error) {
      console.error("Error creating borrower offer:", error);
    }
  };

  const repayLoan = async (loanId) => {
    try {
      await axios.put(`/api/loans/${loanId}/repay`);
      console.log("Loan status updated to repaid");
    } catch (error) {
      console.error("Error repaying loan:", error);
    }
  };
  
  const rateBorrower = async (loanId, borrowerRating) => {
    try {
      await axios.put(`/api/loans/${loanId}/rate`, { borrowerRating });
      console.log("Rating successfully added");
    } catch (error) {
      console.error("Error rating borrower:", error);
    }
  };

  return (
    <Dashboard>
      <h1>Hello word</h1>
      <Tabs defaultValue="lenders" className="w-full bg-[]">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="lenders">Lenders Offers</TabsTrigger>
            <TabsTrigger value="borrowers">Borrowers Offers</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <PostOfferDialog onPostOffer={handlePostLenderOffer} type="lender" />
            <PostOfferDialog onPostOffer={handlePostBorrowerOffer} type="borrower" />
          </div>
        </div>

        <TabsContent value="lenders">
          <OffersDisplay offers={lenderOffers} viewMode={viewMode} setViewMode={setViewMode} type="lender" />
        </TabsContent>

        <TabsContent value="borrowers">
          <OffersDisplay offers={borrowerOffers} viewMode={viewMode} setViewMode={setViewMode} type="borrower" />
        </TabsContent>
      </Tabs>
    </Dashboard>
  )
}

function OffersDisplay({ offers, viewMode, setViewMode, type }) {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{type === 'lender' ? 'Lender Offers' : 'Borrower Offers'}</CardTitle>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)} defaultValue="card">
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <FileText className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle>{type === 'lender' ? offer.lender : offer.borrower}</CardTitle>
                  <CardDescription>${offer.amount.toLocaleString()} {type === 'lender' ? 'Loan Offer' : 'Loan Request'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{type === 'lender' ? 'Interest Rate:' : 'Max Interest Rate:'}</span>
                      <span className="font-medium">{type === 'lender' ? offer.interestRate : offer.maxInterestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Term:</span>
                      <span className="font-medium">{offer.term} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{type === 'lender' ? 'Collateral Required:' : 'Collateral Offered:'}</span>
                      <span className="font-medium">{type === 'lender' ? offer.collateralRequired : offer.collateralOffered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>
                        {offer.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{type === 'lender' ? 'Loan Offer Details' : 'Loan Request Details'}</DialogTitle>
                        <DialogDescription>
                          Review the details of this {type === 'lender' ? 'loan offer' : 'loan request'}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">{type === 'lender' ? 'Lender' : 'Borrower'}</h4>
                          <p>{type === 'lender' ? offer.lender : offer.borrower}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Loan Amount</h4>
                          <p>${offer.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">{type === 'lender' ? 'Interest Rate' : 'Max Interest Rate'}</h4>
                          <p>{type === 'lender' ? offer.interestRate : offer.maxInterestRate}% per annum</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Loan Term</h4>
                          <p>{offer.term} months</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">{type === 'lender' ? 'Collateral Required' : 'Collateral Offered'}</h4>
                          <p>{type === 'lender' ? offer.collateralRequired : offer.collateralOffered}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Status</h4>
                          <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>{offer.status}</Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Table className="px-12 bg-[#fff] shadow">
            <TableHeader>
              <TableRow>
                <TableHead>{type === 'lender' ? 'Lender' : 'Borrower'}</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>{type === 'lender' ? 'Interest Rate' : 'Max Interest Rate'}</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>{type === 'lender' ? 'Collateral Required' : 'Collateral Offered'}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{type === 'lender' ? offer.lender : offer.borrower}</TableCell>
                  <TableCell>${offer.amount.toLocaleString()}</TableCell>
                  <TableCell>{type === 'lender' ? offer.interestRate : offer.maxInterestRate}%</TableCell>
                  <TableCell>{offer.term} months</TableCell>
                  <TableCell>{type === 'lender' ? offer.collateralRequired : offer.collateralOffered}</TableCell>
                  <TableCell>
                    <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>
                      {offer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{type === 'lender' ? 'Loan Offer Details' : 'Loan Request Details'}</DialogTitle>
                          <DialogDescription>
                            Review the details of this {type === 'lender' ? 'loan offer' : 'loan request'}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">{type === 'lender' ? 'Lender' : 'Borrower'}</h4>
                            <p>{type === 'lender' ? offer.lender : offer.borrower}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Loan Amount</h4>
                            <p>${offer.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">{type === 'lender' ? 'Interest Rate' : 'Max Interest Rate'}</h4>
                            <p>{type === 'lender' ? offer.interestRate : offer.maxInterestRate}% per annum</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Loan Term</h4>
                            <p>{offer.term} months</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">{type === 'lender' ? 'Collateral Required' : 'Collateral Offered'}</h4>
                            <p>{type === 'lender' ? offer.collateralRequired : offer.collateralOffered}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Status</h4>
                            <Badge variant={offer.status === 'active' ? 'success' : 'secondary'}>{offer.status}</Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

function PostOfferDialog({ onPostOffer, type }) {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [term, setTerm] = useState('')
  const [collateral, setCollateral] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onPostOffer({
      [type === 'lender' ? 'lender' : 'borrower']: 'New User', // This should be replaced with the actual user's name or address
      amount: parseFloat(amount),
      [type === 'lender' ? 'interestRate' : 'maxInterestRate']: parseFloat(interestRate),
      term: parseInt(term),
      [type === 'lender' ? 'collateralRequired' : 'collateralOffered']: collateral,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#6366F1] hover:bg-[#5355d1] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Post {type === 'lender' ? 'Offer' : 'Request'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a New {type === 'lender' ? 'Loan Offer' : 'Loan Request'}</DialogTitle>
          <DialogDescription>
            Fill in the details of your {type === 'lender' ? 'loan offer' : 'loan request'} below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Loan Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
              required
            />
          </div>
          <div>
            <Label htmlFor="interestRate">{type === 'lender' ? 'Interest Rate' : 'Max Interest Rate'} (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="5.5"
              step="0.1"
              required
            />
          </div>
          <div>
            <Label htmlFor="term">Loan Term (months)</Label>
            <Input
              id="term"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="12"
              required
            />
          </div>
          <div>
            <Label htmlFor="collateral">{type === 'lender' ? 'Collateral Required' : 'Collateral Offered'}</Label>
            <Select onValueChange={setCollateral} required>
              <SelectTrigger>
                <SelectValue placeholder="Select collateral type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-[#6366F1] hover:bg-[#5355d1] text-white">
            Post {type === 'lender' ? 'Offer' : 'Request'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
